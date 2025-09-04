import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

connectDb()
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