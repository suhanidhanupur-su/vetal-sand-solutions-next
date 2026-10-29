import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to catalog fixture
const FIXTURE_PATH = path.resolve(__dirname, "../data/initial_catalog.json");
const DB_NAME = "vetal_sand_solutions";

async function main() {
  const isExecute = process.argv.includes("--execute");

  console.log("==================================================");
  console.log(" Vetal Sand Solutions - Catalog Migration Tool");
  console.log(` Mode: ${isExecute ? "EXECUTE (Insert-only)" : "DRY RUN (Preview & Validation)"}`);
  console.log("==================================================\n");

  // 1. Verify fixture file exists
  if (!fs.existsSync(FIXTURE_PATH)) {
    console.error(`[ERROR] Catalog fixture not found at: ${FIXTURE_PATH}`);
    console.error("Please place initial_catalog.json in the 'data/' directory.");
    process.exit(1);
  }

  // 2. Load and parse fixture data
  let rawData;
  try {
    rawData = JSON.parse(fs.readFileSync(FIXTURE_PATH, "utf8"));
  } catch (err) {
    console.error("[ERROR] Failed to parse JSON fixture:", err.message);
    process.exit(1);
  }

  const rawCategories = rawData.filter((item) => item.model === "products.category");
  const rawProducts = rawData.filter((item) => item.model === "products.product");
  const rawImages = rawData.filter((item) => item.model === "products.productimage");

  console.log(`[FIXTURE] Found in ${path.basename(FIXTURE_PATH)}:`);
  console.log(`  - Categories:     ${rawCategories.length}`);
  console.log(`  - Products:       ${rawProducts.length}`);
  console.log(`  - Product Images: ${rawImages.length}\n`);

  // 3. Connect to MongoDB without exposing credentials
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[ERROR] MONGODB_URI is not set. Ensure .env.local is loaded via '--env-file=.env.local'");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const categoriesCollection = db.collection("categories");
    const productsCollection = db.collection("products");

    console.log(`[DATABASE] Connected to database: "${DB_NAME}"\n`);

    // 4. Duplicate and conflict detection
    console.log("[VALIDATION] Checking for conflicting records in MongoDB...");

    const categoryDjangoIds = rawCategories.map((c) => c.pk);
    const categorySlugs = rawCategories.map((c) => c.fields.slug);

    const productDjangoIds = rawProducts.map((p) => p.pk);
    const productSlugs = rawProducts.map((p) => p.fields.slug);

    const [existingCategoriesById, existingCategoriesBySlug, existingProductsById, existingProductsBySlug] =
      await Promise.all([
        categoriesCollection.find({ djangoId: { $in: categoryDjangoIds } }).toArray(),
        categoriesCollection.find({ slug: { $in: categorySlugs } }).toArray(),
        productsCollection.find({ djangoId: { $in: productDjangoIds } }).toArray(),
        productsCollection.find({ slug: { $in: productSlugs } }).toArray(),
      ]);

    const conflicts = [];

    for (const cat of [...existingCategoriesById, ...existingCategoriesBySlug]) {
      conflicts.push(`Category conflict: slug='${cat.slug}', djangoId=${cat.djangoId || cat.id}`);
    }

    for (const prod of [...existingProductsById, ...existingProductsBySlug]) {
      conflicts.push(`Product conflict: slug='${prod.slug}', djangoId=${prod.djangoId || prod.id}`);
    }

    if (conflicts.length > 0) {
      console.error("\n[STOP] Conflicts detected! Duplicate records already exist in the database:");
      conflicts.forEach((c) => console.error(`  - ${c}`));
      console.error("\nMigration aborted to prevent overwriting or duplicating data.");
      process.exit(1);
    }

    console.log("  ✓ No conflicts found in 'categories' or 'products' collections.\n");

    // 5. Structure Categories
    const categoryDocMap = new Map(); // djangoId -> Category document
    const categoryDocsToInsert = [];

    for (const cat of rawCategories) {
      const catDoc = {
        _id: new ObjectId(),
        djangoId: cat.pk,
        id: cat.pk,
        name: cat.fields.name,
        slug: cat.fields.slug,
        description: cat.fields.description || "",
        is_active: Boolean(cat.fields.is_active),
        created_at: new Date(cat.fields.created_at),
      };
      categoryDocMap.set(cat.pk, catDoc);
      categoryDocsToInsert.push(catDoc);
    }

    // 6. Group images by product djangoId
    const imagesByProductId = new Map();
    for (const img of rawImages) {
      const prodId = img.fields.product;
      if (!imagesByProductId.has(prodId)) {
        imagesByProductId.set(prodId, []);
      }
      imagesByProductId.get(prodId).push({
        djangoId: img.pk,
        image: img.fields.image,
        alt_text: img.fields.alt_text || "",
        is_primary: Boolean(img.fields.is_primary),
        created_at: new Date(img.fields.created_at),
      });
    }

    // 7. Structure Products
    const productDocsToInsert = [];

    for (const prod of rawProducts) {
      const djangoCategoryId = prod.fields.category;
      const matchedCategory = categoryDocMap.get(djangoCategoryId);

      if (!matchedCategory) {
        console.error(
          `[ERROR] Product '${prod.fields.name}' references non-existent category pk ${djangoCategoryId}`
        );
        process.exit(1);
      }

      const prodImages = imagesByProductId.get(prod.pk) || [];
      const primaryImage =
        prodImages.find((img) => img.is_primary) ||
        prodImages[0] ||
        null;

      const prodDoc = {
        _id: new ObjectId(),
        djangoId: prod.pk,
        djangoCategoryId: djangoCategoryId,
        category: matchedCategory._id,
        category_id: matchedCategory._id,
        name: prod.fields.name,
        slug: prod.fields.slug,
        short_description: prod.fields.short_description || "",
        description: prod.fields.description || "",
        grade: prod.fields.grade || "",
        price: prod.fields.price !== null && prod.fields.price !== undefined ? String(prod.fields.price) : null,
        specifications: prod.fields.specifications || "",
        applications: prod.fields.applications || "",
        industries: prod.fields.industries || "",
        is_active: Boolean(prod.fields.is_active),
        is_featured: Boolean(prod.fields.is_featured),
        created_at: new Date(prod.fields.created_at),
        updated_at: new Date(prod.fields.updated_at),
        images: prodImages,
        primary_image: primaryImage,
      };

      productDocsToInsert.push(prodDoc);
    }

    // 8. Report pre-import summary
    console.log("[SUMMARY] Records prepared for migration:");
    console.log("--------------------------------------------------");
    console.log("Categories to import:");
    categoryDocsToInsert.forEach((c) => {
      console.log(`  [Category] ID: ${c.djangoId} | Name: "${c.name}" | Slug: "${c.slug}"`);
    });

    console.log("\nProducts to import:");
    productDocsToInsert.forEach((p) => {
      const cat = categoryDocMap.get(p.djangoCategoryId);
      console.log(
        `  [Product] ID: ${p.djangoId} | Name: "${p.name}" | Grade: "${p.grade}" | Category: "${cat.name}" | Images: ${p.images.length}`
      );
    });
    console.log("--------------------------------------------------\n");

    // 9. Execute or finish Dry Run
    if (!isExecute) {
      console.log("[DRY RUN COMPLETE] Validation succeeded. Zero records were inserted.");
      console.log("To execute the migration and insert these records, run:");
      console.log("  node --env-file=.env.local scripts/import-catalog.js --execute\n");
    } else {
      console.log("[IMPORTING] Performing insert-only migration...");

      // Insert categories
      const catResult = await categoriesCollection.insertMany(categoryDocsToInsert);
      console.log(`  ✓ Inserted ${catResult.insertedCount} categories into 'categories' collection.`);

      // Insert products
      const prodResult = await productsCollection.insertMany(productDocsToInsert);
      console.log(`  ✓ Inserted ${prodResult.insertedCount} products into 'products' collection.`);

      console.log("\n[SUCCESS] Catalog migration completed successfully!");
      console.log("You can now test GET /api/products to view the migrated catalog.\n");
    }
  } catch (err) {
    console.error("[ERROR] Migration failed with error:", err.message || err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
