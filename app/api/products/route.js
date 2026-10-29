import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Helper function to safely escape regular expression characters
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export async function GET(request) {
  try {
    // 1. Connect to MongoDB database
    const client = await clientPromise;
    const DB_NAME = "vetal_sand_solutions";
    const db = client.db(DB_NAME);

    const productsCollection = db.collection("products");
    const categoriesCollection = db.collection("categories");

    // [DIAGNOSTIC] Log DB and collection names, and total counts before any filter
    const totalProducts = await productsCollection.countDocuments({});
    const totalCategories = await categoriesCollection.countDocuments({});
    console.log(`[DIAG] Database: "${DB_NAME}" | Collection: "products" | Total docs (no filter): ${totalProducts}`);
    console.log(`[DIAG] Database: "${DB_NAME}" | Collection: "categories" | Total docs: ${totalCategories}`);

    // 2. Read query parameters from URL
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    const categoryParam = searchParams.get("category")?.trim();
    const gradeParam = searchParams.get("grade")?.trim();

    // 3. Read categories from categories collection for lookup
    const categories = await categoriesCollection.find({}).toArray();

    // Build category map for quick lookup by ID, slug, and name
    const categoryMap = new Map();
    for (const cat of categories) {
      if (cat._id) categoryMap.set(String(cat._id), cat);
      if (cat.id !== undefined && cat.id !== null) categoryMap.set(String(cat.id), cat);
      if (cat.slug) categoryMap.set(cat.slug.toLowerCase(), cat);
      if (cat.name) categoryMap.set(cat.name.toLowerCase(), cat);
    }

    // 4. Build query filter for active products
    // Only return active products (is_active is true or not explicitly false)
    const filter = {
      is_active: { $ne: false },
    };

    const andConditions = [];

    // Optional 'q' query parameter: case-insensitive search across name, short_description, and description
    if (q) {
      const searchRegex = { $regex: escapeRegex(q), $options: "i" };
      andConditions.push({
        $or: [
          { name: searchRegex },
          { short_description: searchRegex },
          { description: searchRegex },
        ],
      });
    }

    // Optional 'grade' query parameter: exact match (case-insensitive)
    if (gradeParam) {
      const gradeRegex = { $regex: `^${escapeRegex(gradeParam)}$`, $options: "i" };
      andConditions.push({
        grade: gradeRegex,
      });
    }

    // Optional 'category' query parameter: filter by slug, name, or id
    if (categoryParam) {
      const targetParamLower = categoryParam.toLowerCase();
      const matchedCategory = categories.find(
        (cat) =>
          cat.slug?.toLowerCase() === targetParamLower ||
          cat.name?.toLowerCase() === targetParamLower ||
          String(cat._id) === categoryParam ||
          (cat.id !== undefined && String(cat.id) === categoryParam)
      );

      // Collect potential match values for MongoDB query
      const categoryIdentifiers = new Set([categoryParam, targetParamLower]);
      if (!isNaN(Number(categoryParam))) {
        categoryIdentifiers.add(Number(categoryParam));
      }

      if (matchedCategory) {
        if (matchedCategory._id) {
          categoryIdentifiers.add(matchedCategory._id);
          categoryIdentifiers.add(String(matchedCategory._id));
        }
        if (matchedCategory.id !== undefined && matchedCategory.id !== null) {
          categoryIdentifiers.add(matchedCategory.id);
          categoryIdentifiers.add(String(matchedCategory.id));
          if (!isNaN(Number(matchedCategory.id))) {
            categoryIdentifiers.add(Number(matchedCategory.id));
          }
        }
        if (matchedCategory.slug) {
          categoryIdentifiers.add(matchedCategory.slug);
          categoryIdentifiers.add(matchedCategory.slug.toLowerCase());
        }
        if (matchedCategory.name) {
          categoryIdentifiers.add(matchedCategory.name);
          categoryIdentifiers.add(matchedCategory.name.toLowerCase());
        }
      }

      const matchValues = Array.from(categoryIdentifiers);
      const categoryConditions = [
        { category: { $in: matchValues } },
        { category_id: { $in: matchValues } },
        { "category.slug": { $regex: `^${escapeRegex(categoryParam)}$`, $options: "i" } },
        { "category.name": { $regex: `^${escapeRegex(categoryParam)}$`, $options: "i" } },
      ];

      if (matchedCategory?.slug) {
        categoryConditions.push({
          "category.slug": { $regex: `^${escapeRegex(matchedCategory.slug)}$`, $options: "i" },
        });
      }

      andConditions.push({ $or: categoryConditions });
    }

    // Combine conditions if any were added
    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }

    // 5. Fetch products from products collection
    const products = await productsCollection
      .find(filter)
      .sort({ created_at: -1 })
      .toArray();

    // [DIAGNOSTIC] Log the active-filter result vs total
    console.log(`[DIAG] Filter applied: ${JSON.stringify(filter)}`);
    console.log(`[DIAG] Products matched by filter: ${products.length} / ${totalProducts} total in collection`);

    // 6. Attach category details where possible
    const productsWithCategory = products.map((product) => {
      // If product already contains an embedded category object
      if (
        product.category &&
        typeof product.category === "object" &&
        !Array.isArray(product.category) &&
        (product.category.name || product.category.slug)
      ) {
        return product;
      }

      const categoryRef = product.category ?? product.category_id;
      let matchedCategory = null;

      if (categoryRef !== undefined && categoryRef !== null) {
        const refStr = String(categoryRef);
        const refLower = refStr.toLowerCase();

        matchedCategory =
          categoryMap.get(refStr) ||
          categoryMap.get(refLower) ||
          null;
      }

      return {
        ...product,
        category: matchedCategory || product.category || null,
      };
    });

    // 7. Return valid JSON with appropriate HTTP status code
    return NextResponse.json({
      success: true,
      count: productsWithCategory.length,
      products: productsWithCategory,
    });
  } catch (error) {
    // 8. Log internal error details without exposing credentials to the client
    console.error("Error fetching products:", error.message || error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products. Check server logs.",
      },
      { status: 500 }
    );
  }
}
