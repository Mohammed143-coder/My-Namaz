import { connectDb } from "@/lib/db";
import { Hadith } from "@/models/Hadith";
import { NextResponse } from "next/server";

connectDb();
export const GET = async () => {
  try {
    const hadith = await Hadith.find();
    return NextResponse.json({
      message: "Hadith fetched sucessfully",
      details: hadith,
    });
  } catch (error) {
    return NextResponse.json({
      message: "failed to fetch hadith",
      details: error.message,
    });
  }
};
export const PUT = async (req) => {
  try {
    const Id = new URL(req.url).searchParams.get("Id");
    const body = await req.json();
    if (!Id) {
      return NextResponse.json(
        {
          message: "Particular Id not found",
        },
        { status: 400 }
      );
    }
    const hadith = await Hadith.findByIdAndUpdate(
      Id,
      { $set: body },
      { new: true }
    );
    return NextResponse.json({
      message: "New hadith has been updated successfully",
      details: hadith,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went worng..!",
      details: error.message,
    });
  }
};
export const POST = async (req) => {
  try {
    const body = await req.json();
    const hadith = new Hadith(body);
    const newHadith = await hadith.save();
    return NextResponse.json({
      messge: "New hadith creted sucessfully",
      details: newHadith,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create hadith",
      details: error.message,
    });
  }
};
