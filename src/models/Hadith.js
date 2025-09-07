import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    hadiths: {
      english: {
        quote: { type: String, required: true },
        reflection: { type: String },
      },
      urdu: {
        quote: { type: String, required: true },
        reflection: { type: String },
      },
      // add more languages later if needed
    },
  },
  { timestamps: true }
);

export const Hadith =
  mongoose.models.hadiths || mongoose.model("hadiths", quoteSchema);
