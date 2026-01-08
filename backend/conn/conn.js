import mongoose from "mongoose";

const connec = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000,  // Wait 30 seconds for server
      socketTimeoutMS: 45000,            // Wait 45 seconds for operations
    });
    console.log("connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export default connec;