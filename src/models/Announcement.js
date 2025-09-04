import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    type: { type: String, default: "common" },
    message: { type: String, required: true },
    expiresAt: { type: Date,  default: () => new Date(Date.now() + 8 * 60 * 60 * 1000)}, // ✅ 8 hours later }, // <- Important for TTL
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masjidUsers",
      required: true,
    },
  },
  { timestamps: true }
);

// TTL index: delete docs after "expiresAt"
announcementSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Announcement =
  mongoose.models.announcements ||
  mongoose.model("announcements", announcementSchema);
