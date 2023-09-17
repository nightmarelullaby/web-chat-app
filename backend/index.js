import { Server as WebSocketServer } from "socket.io";
import app from "./app.js";
import { connectDB } from "./db.js";
import http from "http";
import Sockets from "./sockets.js";
import Grid from 'gridfs-stream';
import mongoose from "mongoose";

const mongoDBConnection = connectDB();
let gfs

//init Grid stream
mongoDBConnection.once('open', () => {
  gfs = Grid(mongoDBConnection.db, mongoose.mongo);
  gfs.collection('uploads');
});
//init Grid stream

const server = http.createServer(app);
const httpServer = server.listen(3001);
const io = new WebSocketServer(httpServer,{
    cors:{
      origin:"*",
    }
});
Sockets(io);
export {io}
  
  