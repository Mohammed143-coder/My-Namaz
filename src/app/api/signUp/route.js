import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connectDb();
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (userId) {
      const user = await User.findById(userId).select("-password");;
      return NextResponse.json({
        message: "User Found Sucessfully",
        details: user,
      });
    }
    const users = await User.find().select("-password");;
    return NextResponse.json({
      message: "Users Fetched sucessfully",
      details: users,
      success:true
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      details: error.message,
      success:false
    },{status:400});
  }
};
export const POST = async (req) => {
  try {
    const { userName, userEmail, password, masjid, masjidLocation } =
      await req.json();
    // ✅ hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // encode
    // const encoded = Buffer.from(password).toString("base64");
    const userData = new User({
      userName,
      userEmail,
      password: hashedPassword,
      masjid,
      masjidLocation,
    });
    const newUser = await userData.save();
    return NextResponse.json({
      success: true,
      message: "New user created sucessfully",
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
