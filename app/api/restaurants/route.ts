import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Restaurant from "@/lib/models/Restaurant";

// GET /api/restaurants - Get all restaurants
export async function GET() {
  try {
    await connectDB();

    const restaurants = await Restaurant.find({}).sort({ rating: -1 });

    return NextResponse.json(
      restaurants.map((restaurant) => ({
        ...restaurant.toObject(),
        id: restaurant._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Get restaurants error:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

// POST /api/restaurants - Create new restaurant
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    const restaurants = await Restaurant.create(data);
    const restaurant = Array.isArray(restaurants)
      ? restaurants[0]
      : restaurants;

    return NextResponse.json(
      {
        message: "Restaurant created successfully",
        restaurant: {
          ...restaurant.toObject(),
          id: restaurant._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create restaurant error:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}
