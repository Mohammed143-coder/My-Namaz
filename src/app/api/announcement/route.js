import { connectDb } from "@/lib/db";
import { Announcement } from "@/models/Announcement";
import { NextResponse } from "next/server";

connectDb();
export const GET = async (req) => {
  try {
    const userId = new URL(req.url).searchParams.get("userId");
    if (userId) {
      const announcement = await Announcement.find({ userId: userId });
      return NextResponse.json({
        message: "Announcement fetched sucessfully",
        details: announcement,
        success: true,
      });
    }
    const announcements = await Announcement.find().populate(
      "userId",
      "masjid",
    );
    return NextResponse.json({
      message: "Overall announcement fetched successfully",
      details: announcements,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch announcement",
      details: error.message,
      success: false,
    });
  }
};
export const POST = async (req) => {
  try {
    const { type, message, userId } = await req.json();
    const announcement = new Announcement({ type, message, userId });
    const newAnnouncement = await announcement.save();
    return NextResponse.json({
      message: "New Announcement created sucessfully",
      details: newAnnouncement,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create new announcement",
      details: error.message,
      success: false,
    });
  }
};

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");

    await Announcement.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Announcement deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete announcement",
        details: error.message,
        success: false,
      },
      { status: 400 },
    );
  }
};
