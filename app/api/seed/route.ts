import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database";
import { mockRestaurants } from "@/lib/mock-data";

// POST /api/seed - Seed database with mock data
export async function POST(req: NextRequest) {
  try {
    // Check if restaurants already exist
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";

    console.log("Seed API - DATABASE_URL:", process.env.DATABASE_URL);

    const existingCount = await prisma.restaurant.count();
    console.log("Seed API - Existing count:", existingCount);

    if (existingCount > 0 && !force) {
      return NextResponse.json({
        message: "Database already seeded",
        count: existingCount,
      });
    }

    // Insert mock restaurants
    const createdRestaurants = [];
    for (const r of mockRestaurants) {
      const { menu, ...restaurantData } = r;
      // Remove _id from mock data if present
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...cleanData } = restaurantData as any;

      const created = await prisma.restaurant.create({
        data: {
          ...cleanData,
          menu: {
            create: menu.map((m: any) => ({
              name: m.name,
              category: m.category,
              price: m.price,
              description: m.description,
              imageUrl: m.imageUrl,
            })),
          },
        },
      });
      createdRestaurants.push(created);
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      count: createdRestaurants.length,
      restaurants: createdRestaurants.map((r) => ({
        id: r.id,
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
