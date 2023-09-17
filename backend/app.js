import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import friendRoutes from "./routes/friends.routes.js"
import uploadRoutes from "./routes/upload-files.js"
import cookieParser from "cookie-parser";
import path from 'path';
import crypto from 'crypto';
import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import methodOverride from 'method-override';

const app = express()
app.use(cookieParser())

app.use(cors({
  origin:"*",
  optionsSuccessStatus: 200,
  credentials: true,
}))

app.use(express.json())
app.use(morgan("dev"))

app.use("/api",uploadRoutes)
app.use("/api/auth",authRoutes)
app.use("/api",chatRoutes)
app.use("/api",friendRoutes)

export default app
