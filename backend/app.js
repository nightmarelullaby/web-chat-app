import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import friendRoutes from "./routes/friends.routes.js"
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())

app.use(cors({
  origin:"http://localhost:3000",
  credentials: true,
}))

app.use(express.json())
app.use(morgan("dev"))


app.use("/api/auth",authRoutes)
app.use("/api",chatRoutes)
app.use("/api",friendRoutes)

// if (process.env.NODE_ENV === "production") {
//     const path = await import("path");
//     app.use(express.static("client/dist"));
  
//     app.get("*", (req, res) => {
//       console.log(path.resolve("client", "dist", "index.html") );
//       res.sendFile(path.resolve("client", "dist", "index.html"));
//     });
//   }

export default app
