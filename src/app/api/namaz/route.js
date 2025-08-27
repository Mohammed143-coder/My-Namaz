import { connectDb } from "@/lib/db";
import { Namaz } from "@/models/Namaz";
import { NextResponse } from "next/server";

connectDb();

export const GET=async(req)=>{
    try {
        Namaz.find()
    } catch (error) {
        
    }
}
export const POST = async (req) => {
  try {
    const body = req.json();
    const updatedTime = await Namaz.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json({
      message: "Namaz timing Updated",
      detail: updatedTime,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update namaz timing",
      details: error.message,
      success: false,
    });
  }
};
