import mongoose from "mongoose";

const azkarSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        'morning',
        'evening',
        'before-sleeping',
        'waking-up',
        'after-prayer',
        'after-adhan',
        'entering-mosque',
        'leaving-mosque',
        'eating',
        'drinking'
      ],
      required: true
    },
    arabic: {
      type: String,
      required: true
    },
    transliteration: {
      type: String,
      required: true
    },
    translation: {
      type: String,
      required: true
    },
    repetitions: {
      type: Number,
      default: 1
    },
    benefits: {
      type: String
    },
    reference: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Index for efficient querying by category
azkarSchema.index({ category: 1, order: 1 });

export const Azkar =
  mongoose.models.azkars || mongoose.model("azkars", azkarSchema);
