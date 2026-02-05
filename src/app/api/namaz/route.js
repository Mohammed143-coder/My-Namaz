import { connectDb } from "@/lib/db";
import { Namaz } from "@/models/Namaz";
import { apiSuccess, apiError } from "@/lib/apiResponse";

connectDb();

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const particularMasjid = await Namaz.find({ userId: userId });
    return apiSuccess("Masjid timing fetched successfully", particularMasjid);
  } catch (error) {
    return apiError("Failed to fetch masjid timing", error.message);
  }
};
export const PUT = async (req) => {
  try {
    const userId = new URL(req.url).searchParams.get("userId");
    const body = await req.json();

    const updatedTime = await Namaz.findOneAndUpdate(
      { userId },
      { $set: { namazTiming: body.namazTiming } },
      { new: true, upsert: true },
    );
    return apiSuccess("Namaz timing Updated", updatedTime);
  } catch (error) {
    return apiError("Failed to update namaz timing", error.message);
  }
};
