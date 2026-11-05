import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorMiddleware from './middlewares/errorMiddleware.js';
import cors from "cors"

const app = express();
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
});

app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10kb" }));

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "API to-do-list running" })
})

app.use(errorMiddleware)

export default app