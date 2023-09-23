import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import Grid from 'gridfs-stream';

let gfs
let bucket
export const initGridStream = async (db,mongoose) => {
    bucket = new mongoose.mongo.GridFSBucket(db.db,{bucketName:"uploads"})
    console.log(bucket)
      try{
        gfs = Grid(db.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log("Grid stream started")
      }catch(error){
        throw new Error(error)
      }
}
export const connectDB = async () => {
  try {
    const mongoDBConnection = mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;

    //init Grid stream
    mongoose.connection.once('open', () => {  
      initGridStream(db,mongoose)
    });
    mongoose.connection.on("connected",()=> {
          console.log("MongoDB started")
    })
    mongoose.connection.on('error', err => {
       console.log('Mongoose Default Connection Error : ' + err);
    });

  } catch (error) {
    console.error(error.message,"heree");
  }
};
export {gfs,bucket}