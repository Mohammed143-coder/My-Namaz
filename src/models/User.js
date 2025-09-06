import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    masjid: { type: String },
    masjidLocation: { type: String ,unique: true},
  },
  { timestamps: true }
);
export const User =
  mongoose.models.masjidUsers || mongoose.model("masjidUsers", userSchema);
