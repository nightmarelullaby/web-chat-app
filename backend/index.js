import { Server as WebSocketServer } from "socket.io";
import app from "./app.js";
import { connectDB } from "./db.js";
import http from "http";
import Sockets from "./sockets.js";

connectDB();
const server = http.createServer(app);
const httpServer = server.listen(3001);
const io = new WebSocketServer(httpServer,{
    cors:{
      origin:"http://localhost:3000"
    }
});
Sockets(io);
export {io}
  
  