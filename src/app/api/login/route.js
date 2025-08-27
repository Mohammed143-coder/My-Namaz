import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDb();

export const GET = async (req) => {
  return new NextResponse("Updated");
};

export const POST = async (req) => {
  try {
    const { userEmail, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ userEmail });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Compare password
    const userMatched = await bcrypt.compare(password, user.password);
    if (!userMatched) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          success: false,
        },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" } // Add expiration to JWT itself
    );

    // Create response
    const response = NextResponse.json({
      message: "User login successfully",
      success: true,
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
    });

    // Set cookie with proper options
    response.cookies.set("authToken", token, {
      httpOnly: true, // Security: prevents XSS attacks
      // sameSite: "lax", // CSRF protection
      maxAge: 3600, // 1 hour in seconds (not "1h" string)
      path: "/", // Available on all routes
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        details: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
