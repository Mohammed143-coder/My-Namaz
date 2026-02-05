import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

connectDb();

export const POST = async (req) => {
  try {
    const { userName, userEmail, password, masjid, masjidLocation } =
      await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create User (Unverified)
    const userData = new User({
      userName,
      userEmail,
      password: hashedPassword,
      masjid,
      masjidLocation,
      otp,
      otpExpires,
      isVerified: false,
    });

    const newUser = await userData.save();

    // Send OTP via Email
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      console.log(`Attempting to send OTP to: ${userEmail}`);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Verify your My Namaz Account",
        text: `Your OTP for verification is: ${otp}. It expires in 10 minutes.`,
        html: `<h3>Welcome to My Namaz!</h3><p>Your OTP for verification is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      // Rollback: Delete the user if email fails
      await User.findByIdAndDelete(newUser._id);

      return NextResponse.json({
        success: false,
        message:
          "Failed to send verification email. Registration cancelled. Please try again.",
        details: emailError.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully. Please check your email for OTP.", // Client should look for this message to trigger OTP UI
      details: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create user",
      details: error.message,
    });
  }
};
