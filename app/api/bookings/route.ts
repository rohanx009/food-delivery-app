import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database";

// GET /api/bookings?customerId=xxx - Get bookings by customer ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const bookings = await prisma.tableBooking.findMany({
      where: { customerId },
      orderBy: { date: "desc" },
      include: { restaurant: true },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create new booking
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const booking = await prisma.tableBooking.create({
      data: {
        ...data,
        date: new Date(data.date), // Ensure date is Date object
      },
    });

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
