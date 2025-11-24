import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// POST /api/auth/signup - Create new user
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, phone, role, address } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role,
      address,
    });

    // Return user without password
    const userObject = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = userObject;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          ...userWithoutPassword,
          id: userWithoutPassword._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
