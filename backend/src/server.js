import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import indexRouter from "./routes/index.js"

const app = express();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
  origin: (process.env.CROSSORIGIN || "http://localhost:5173").split(","),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(indexRouter);

export default app;