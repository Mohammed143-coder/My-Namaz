import { connectDb } from "@/lib/db";
import { Announcement } from "@/models/Announcement";
import { apiSuccess, apiError } from "@/lib/apiResponse";

connectDb();
export const GET = async (req) => {
  try {
    const userId = new URL(req.url).searchParams.get("userId");
    if (userId) {
      const announcement = await Announcement.find({ userId: userId });
      return apiSuccess("Announcement fetched successfully", announcement);
    }
    const announcements = await Announcement.find().populate(
      "userId",
      "masjid",
    );
    return apiSuccess(
      "Overall announcement fetched successfully",
      announcements,
    );
  } catch (error) {
    return apiError("Failed to fetch announcement", error.message);
  }
};
export const POST = async (req) => {
  try {
    const { type, message, userId } = await req.json();
    const announcement = new Announcement({ type, message, userId });
    const newAnnouncement = await announcement.save();
    return apiSuccess("New Announcement created successfully", newAnnouncement);
  } catch (error) {
    return apiError("Failed to create new announcement", error.message);
  }
};

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");

    await Announcement.findByIdAndDelete(id);
    return apiSuccess("Announcement deleted successfully");
  } catch (error) {
    return apiError("Failed to delete announcement", error.message);
  }
};
