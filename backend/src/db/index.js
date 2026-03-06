import mongoose from "mongoose";

// here we are just connecting with the database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("✅ Connected successfully with the database");
  } catch (error) {
    console.error("❌ There is a error in the connection process", error);
    process.exit(1);
  }
};

export default connectDb;
