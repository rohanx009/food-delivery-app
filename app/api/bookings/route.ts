import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TableBooking from "@/lib/models/TableBooking";

// GET /api/bookings?customerId=xxx - Get bookings by customer ID
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const customerId = searchParams.get("customerId");
    const restaurantId = searchParams.get("restaurantId");

    let query = {};
    if (customerId) {
      query = { customerId };
    } else if (restaurantId) {
      query = { restaurantId };
    }

    const bookings = await TableBooking.find(query).sort({ date: -1 });

    return NextResponse.json(
      bookings.map((booking) => ({
        ...booking.toObject(),
        id: booking._id.toString(),
      }))
    );
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
    await connectDB();

    const data = await req.json();

    const bookings = await TableBooking.create(data);
    const booking = Array.isArray(bookings) ? bookings[0] : bookings;

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: {
          ...booking.toObject(),
          id: booking._id.toString(),
        },
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
