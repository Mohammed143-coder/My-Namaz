import { connectDb } from "@/lib/db";
import { Namaz } from "@/models/Namaz";
import { NextResponse } from "next/server";

connectDb();

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const particularMasjid = await Namaz.find({ userId: userId });
    return NextResponse.json({
      message: "Masjid timing fetched sucessfully",
      details: particularMasjid,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch masjid timing",
      details: error.message,
      success: false,
    });
  }
};
export const PUT = async (req) => {
  try {
    const userId = new URL(req.url).searchParams.get("userId");
    const body = await req.json();

    const updatedTime = await Namaz.findOneAndUpdate(
      { userId },
      { $set: { namazTiming: body.namazTiming } },
      { new: true, upsert: true }
    );
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
