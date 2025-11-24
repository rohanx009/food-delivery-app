import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Restaurant from "@/lib/models/Restaurant";

// GET /api/restaurants/[id] - Get restaurant by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...restaurant.toObject(),
      id: restaurant._id.toString(),
    });
  } catch (error) {
    console.error("Get restaurant error:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}
