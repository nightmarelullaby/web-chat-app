import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

let gfs

export const connectDB = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    //init Grid stream
    mongoDBConnection.once('open', () => {
      gfs = Grid(mongoDBConnection.db, mongoose.mongo);
      gfs.collection('uploads');
    });
    //init Grid stream
    return mongoDBConnection
    
  } catch (error) {
    console.error(error);
  }
};