import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    type: { type: String, default: "common" },
    message: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // <- Important for TTL
  },
  { timestamps: true }
);

// TTL index: delete docs after "expiresAt"
announcementSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Announcement =
  mongoose.models.announcements ||
  mongoose.model("announcements", announcementSchema);
