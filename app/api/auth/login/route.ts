import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// POST /api/auth/login - Authenticate user
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if role matches
    if (user.role !== role) {
      return NextResponse.json(
        { error: "Invalid role for this user" },
        { status: 403 }
      );
    }

    // Return user without password
    const userObject = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = userObject;

    return NextResponse.json({
      message: "Login successful",
      user: {
        ...userWithoutPassword,
        id: userWithoutPassword._id.toString(),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate user" },
      { status: 500 }
    );
  }
}
