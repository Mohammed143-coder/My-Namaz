import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { apiSuccess, apiError } from "@/lib/apiResponse";
import bcrypt from "bcryptjs";

connectDb();

export const POST = async (req) => {
  try {
    const { email, otp } = await req.json();

    // console.log(`[Verify] Request for: ${email}, OTP: '${otp}'`);

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      console.info("[Verify] User not found");
      return apiError("User not found", null, 404);
    }

    // console.log(`[Verify] Stored OTP: '${user.otp}'`);

    if (user.isVerified) {
      return apiSuccess("User already verified");
    }

    if (new Date() > user.otpExpires) {
      console.info(
        `[Verify] OTP Expired. Expires: ${user.otpExpires}, Now: ${new Date()}`,
      );
      return apiError("OTP expired");
    }

    const isValid = String(user.otp).trim() === String(otp).trim();
    if (!isValid) {
      // console.log(
      //   `[Verify] Mismatch. Stored: '${user.otp}' vs Received: '${otp}'`,
      // );
      return apiError("Invalid OTP");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return apiSuccess("Email verified successfully");
  } catch (error) {
    return apiError("Verification failed", error.message, 500);
  }
};
