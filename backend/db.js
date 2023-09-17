import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(
      MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    return mongoDBConnection
    
  } catch (error) {
    console.error(error);
  }
};