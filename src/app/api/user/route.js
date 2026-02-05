import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/apiResponse";

connectDb();
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (userId) {
      const user = await User.findById(userId).select("-password");
      return apiSuccess("User Found Successfully", user);
    }
    const users = await User.find().select("-password");
    return apiSuccess("Users Fetched successfully", users);
  } catch (error) {
    return apiError("Something went wrong", error.message);
  }
};

export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");

    await User.findByIdAndDelete(id);
    return apiSuccess("User deleted successfully");
  } catch (error) {
    return apiError("Failed to delete user", error.message);
  }
};
