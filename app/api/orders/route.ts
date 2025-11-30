import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database";

// GET /api/orders?customerId=xxx - Get orders by customer ID
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

    const orders = await prisma.order.findMany({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        restaurant: true,
      },
    });

    return NextResponse.json(orders);
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
    const data = await req.json();
    const { items, ...orderData } = data;

    const order = await prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items.map((item: any) => ({
            name: item.menuItem.name,
            price: item.menuItem.price,
            imageUrl: item.menuItem.imageUrl,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(
      {
        message: "Order created successfully",
        order,
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
