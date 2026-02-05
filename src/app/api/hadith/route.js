import { connectDb } from "@/lib/db";
import { Hadith } from "@/models/Hadith";
import { apiSuccess, apiError } from "@/lib/apiResponse";

connectDb();
export const GET = async () => {
  try {
    const hadith = await Hadith.find();
    return apiSuccess("Hadith fetched successfully", hadith);
  } catch (error) {
    return apiError("Failed to fetch hadith", error.message);
  }
};
export const PUT = async (req) => {
  try {
    const Id = new URL(req.url).searchParams.get("Id");
    const body = await req.json();
    if (!Id) {
      return apiError("Particular Id not found");
    }
    const hadith = await Hadith.findByIdAndUpdate(
      Id,
      { $set: body },
      { new: true },
    );
    return apiSuccess("New hadith has been updated successfully", hadith);
  } catch (error) {
    return apiError("Something went wrong!", error.message);
  }
};
export const POST = async (req) => {
  try {
    const body = await req.json();
    const hadith = new Hadith(body);
    const newHadith = await hadith.save();
    return apiSuccess("New hadith created successfully", newHadith);
  } catch (error) {
    return apiError("Failed to create hadith", error.message);
  }
};
