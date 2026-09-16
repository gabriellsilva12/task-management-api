import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";
import { sequelize, testConnection, syncDatabase } from "./config/database.js"
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import "./models/index.js"
import { User } from './models/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

config()

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
});

app.use(helmet())
app.use(limiter)

app.use(express.json({
  limit: "10kb"
}));

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "API to-do-list running" })
})

app.use(errorMiddleware)

const startServer = async () => {

  try {

    await testConnection()

    await syncDatabase(false)

    // const user = await User.findOne({ where: { id: 12 } })

    // await user.destroy()

    app.listen(PORT, () => {
      console.log(`Server running => PORT: ${PORT}`)
    })
  } catch (error) {
    console.error("Error connection Database: ", error)
  }

}

startServer()