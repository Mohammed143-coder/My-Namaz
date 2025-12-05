import mongoose from "mongoose";

const namazSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masjidUsers",
      required: true,
    },
    namazTiming: {
      fajr: {
        azanTime: { time: String, period: String },
        namazTime: { time: String, period: String },
      },
      sunrise: { time: String, period: String }, // Only one timing for sunrise
      zohar: {
        azanTime: { time: String, period: String },
        namazTime: { time: String, period: String },
      },
      asr: {
        azanTime: { time: String, period: String },
        namazTime: { time: String, period: String },
      },
      maghrib: {
        azanTime: { time: String, period: String },
        namazTime: { time: String, period: String },
      },
      isha: {
        azanTime: { time: String, period: String },
        namazTime: { time: String, period: String },
      },
    },
  },
  { timestamps: true }
);

export const Namaz =
  mongoose.models.namazs || mongoose.model("namazs", namazSchema);
