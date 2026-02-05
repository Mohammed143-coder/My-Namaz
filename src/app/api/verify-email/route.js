import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDb();

export const POST = async (req) => {
  try {
    const { email, otp } = await req.json();

    console.log(`[Verify] Request for: ${email}, OTP: '${otp}'`);

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      console.log("[Verify] User not found");
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    console.log(`[Verify] Stored OTP: '${user.otp}'`);

    if (user.isVerified) {
      return NextResponse.json({
        success: true,
        message: "User already verified",
      });
    }

    if (new Date() > user.otpExpires) {
      console.log(
        `[Verify] OTP Expired. Expires: ${user.otpExpires}, Now: ${new Date()}`,
      );
      return NextResponse.json(
        { success: false, message: "OTP expired" },
        { status: 400 },
      );
    }

    const isValid = String(user.otp).trim() === String(otp).trim();
    if (!isValid) {
      console.log(
        `[Verify] Mismatch. Stored: '${user.otp}' vs Received: '${otp}'`,
      );
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 },
      );
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
        details: error.message,
      },
      { status: 500 },
    );
  }
};
