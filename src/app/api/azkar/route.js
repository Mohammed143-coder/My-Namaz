import { connectDb } from "@/lib/db";
import { Azkar } from "@/models/Azkar";
import { NextResponse } from "next/server";

connectDb();

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const azkars = await Azkar.find(query).sort({ order: 1, createdAt: 1 });
    
    return NextResponse.json({
      message: "Azkar fetched successfully",
      data: azkars,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching azkar:", error);
    return NextResponse.json({
      message: "Failed to fetch azkar",
      details: error.message,
      success: false,
    }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const {
      category,
      arabic,
      transliteration,
      translation,
      repetitions,
      benefits,
      reference,
      order
    } = body;

    // Validation
    if (!category || !arabic || !transliteration || !translation || !reference) {
      return NextResponse.json({
        message: "Missing required fields",
        success: false,
      }, { status: 400 });
    }

    const newAzkar = await Azkar.create({
      category,
      arabic,
      transliteration,
      translation,
      repetitions: repetitions || 1,
      benefits: benefits || '',
      reference,
      order: order || 0
    });

    return NextResponse.json({
      message: "Azkar created successfully",
      data: newAzkar,
      success: true,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating azkar:", error);
    return NextResponse.json({
      message: "Failed to create azkar",
      details: error.message,
      success: false,
    }, { status: 500 });
  }
};
