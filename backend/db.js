import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import Grid from 'gridfs-stream';

let gfs

export const connectDB = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    //init Grid stream
    db.once('open', () => {
      gfs = Grid(db.db, mongoose.mongo);
      gfs.collection('uploads');
      console.log("gfs started",gfs)
    });
    //init Grid stream
    console.log("MongoDB started")
  } catch (error) {
    console.error(error);
  }
};
export {gfs}