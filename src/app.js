import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
});

app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: "10kb" }));

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "API to-do-list running" })
})

app.use(errorMiddleware)

export default app