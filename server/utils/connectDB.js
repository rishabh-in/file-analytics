import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection established");
  } catch (error) {
    console.log("Error in connecting db")
  }
}

export default connectDB;