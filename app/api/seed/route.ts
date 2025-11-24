import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Restaurant from "@/lib/models/Restaurant";
import { mockRestaurants } from "@/lib/mock-data";

// POST /api/seed - Seed database with mock data
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Check if restaurants already exist
    const existingCount = await Restaurant.countDocuments();

    if (existingCount > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        count: existingCount,
      });
    }

    // Insert mock restaurants
    const restaurants = await Restaurant.insertMany(mockRestaurants);

    return NextResponse.json({
      message: "Database seeded successfully",
      count: restaurants.length,
      restaurants: restaurants.map((r) => ({
        id: r._id.toString(),
        name: r.name,
      })),
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
