import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

// GET /api/orders?customerId=xxx - Get orders by customer ID
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

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      orders.map((order) => ({
        ...order.toObject(),
        id: order._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create new order
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    const orders = await Order.create(data);
    const order = Array.isArray(orders) ? orders[0] : orders;

    return NextResponse.json(
      {
        message: "Order created successfully",
        order: {
          ...order.toObject(),
          id: order._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
