// Test script to create sample announcements
// Run with: node testAnnouncements.js

const mongoose = require("mongoose");

// MongoDB connection
const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/namaz"
    );
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
};

// Models
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  masjid: { type: String, required: true },
});

const announcementSchema = new mongoose.Schema(
  {
    type: { type: String, default: "common" },
    message: { type: String, required: true },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 8 * 60 * 60 * 1000),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masjidUsers",
      required: true,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.masjidUsers || mongoose.model("masjidUsers", userSchema);
const Announcement =
  mongoose.models.announcements ||
  mongoose.model("announcements", announcementSchema);

// Main function
async function createTestAnnouncements() {
  await connectDb();

  try {
    // Find first user
    const user = await User.findOne();

    if (!user) {
      console.log("❌ No users found in database. Please create a user first.");
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.userName} - ${user.masjid}`);

    // Create test announcements
    const announcements = [
      {
        type: "important",
        message:
          "Jummah Salah will start at 1:30 PM sharp this Friday. Please arrive early!",
        userId: user._id,
      },
      {
        type: "common",
        message: "Daily Isha prayer time remains at 8:15 PM.",
        userId: user._id,
      },
      {
        type: "important",
        message:
          "Special lecture on Seerah after Maghrib tomorrow. All are welcome.",
        userId: user._id,
      },
      {
        type: "common",
        message:
          "Community cleaning drive scheduled for Sunday morning at 9 AM.",
        userId: user._id,
      },
    ];

    // Delete existing announcements (for testing)
    await Announcement.deleteMany({});
    console.log("🗑️  Cleared existing announcements");

    // Insert new announcements
    const created = await Announcement.insertMany(announcements);
    console.log(`✅ Created ${created.length} test announcements`);

    console.log("\nAnnouncements:");
    created.forEach((ann, idx) => {
      console.log(
        `${idx + 1}. [${ann.type.toUpperCase()}] ${ann.message.substring(
          0,
          50
        )}...`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run
createTestAnnouncements();
