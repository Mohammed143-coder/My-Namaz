import mongoose from "mongoose";

let isConnected = false; // 🔒 global flag
console.log("isConnected :",isConnected)
export const connectDb = async () => {
  if (isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return;
  }

  if (!process.env.MONGO_DB_URI) {
    throw new Error("❌ MONGO_DB_URI not defined in .env");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI);
    isConnected = !!db.connections[0].readyState;
    
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Something went wrong connecting to MongoDB:", error);
    throw error;
  }
};
