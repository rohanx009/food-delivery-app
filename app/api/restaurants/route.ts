import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database";

// GET /api/restaurants - Get all restaurants
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: { rating: "desc" },
      include: { menu: true },
    });

    return NextResponse.json(restaurants);
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
    const data = await req.json();

    // Separate menu items from restaurant data if present
    const { menu, ...restaurantData } = data;

    const restaurant = await prisma.restaurant.create({
      data: {
        ...restaurantData,
        menu: {
          create: menu || [],
        },
      },
      include: { menu: true },
    });

    return NextResponse.json(
      {
        message: "Restaurant created successfully",
        restaurant,
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
