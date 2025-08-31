import mongoose from "mongoose";

const namazSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masjidUsers",
      required: true,
    },
    namazTiming: {
      fajr: { time: String, period: String },
      sunrise: { time: String, period: String },
      zohar: { time: String, period: String },
      asr: { time: String, period: String },
      maghrib: { time: String, period: String },
      isha: { time: String, period: String },
    },
  },
  { timestamps: true }
);

export const Namaz =
  mongoose.models.namazs || mongoose.model("namazs", namazSchema);
