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
    });
    //init Grid stream
    return mongoDBConnection
    
  } catch (error) {
    console.error(error);
  }
};