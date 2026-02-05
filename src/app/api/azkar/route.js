import { connectDb } from "@/lib/db";
import { Azkar } from "@/models/Azkar";
import { apiSuccess, apiError } from "@/lib/apiResponse";

connectDb();

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const azkars = await Azkar.find(query).sort({ order: 1, createdAt: 1 });

    return apiSuccess("Azkar fetched successfully", azkars);
  } catch (error) {
    console.error("Error fetching azkar:", error);
    return apiError("Failed to fetch azkar", error.message, 500);
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
      order,
    } = body;

    // Validation
    if (
      !category ||
      !arabic ||
      !transliteration ||
      !translation ||
      !reference
    ) {
      return apiError("Missing required fields");
    }

    const newAzkar = await Azkar.create({
      category,
      arabic,
      transliteration,
      translation,
      repetitions: repetitions || 1,
      benefits: benefits || "",
      reference,
      order: order || 0,
    });

    return apiSuccess("Azkar created successfully", newAzkar, 210); // status 210 is fine, or 201
  } catch (error) {
    console.error("Error creating azkar:", error);
    return apiError("Failed to create azkar", error.message, 500);
  }
};
