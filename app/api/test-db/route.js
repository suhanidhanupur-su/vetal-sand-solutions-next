
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db("vetal_sand_solutions").command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    return NextResponse.json(
      { success: false, message: "MongoDB connection failed. Check server logs." },
      { status: 500 }
    );
  }
}
