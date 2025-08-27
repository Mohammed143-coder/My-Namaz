import mongoose from "mongoose";

const namazSchema = new mongoose.Schema(
  {
    fajr: { type: String, required: true },
    sunrise: { type: String, required: true },
    zohar: { type: String, required: true },
    asr: { type: String, required: true },
    maghrib: { type: String, required: true },
    isha: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "masjidUsers", required: true }, // 👈 linked to user
  },
  { timestamps: true }
);

export const Namaz =
  mongoose.models.namazs || mongoose.model("namazs", namazSchema);
