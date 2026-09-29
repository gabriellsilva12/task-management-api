import express from "express"
import rateLimit from "express-rate-limit"
import { login, register } from "../controllers/authController.js"

const router = express.Router()

const isTestEnv = process.env.NODE_ENV === "test";

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: isTestEnv ? 1000 : 5,
})

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: isTestEnv ? 1000 : 10,
})

router.post("/login", loginLimiter, login)
router.post("/register", registerLimiter, register)

export default router;