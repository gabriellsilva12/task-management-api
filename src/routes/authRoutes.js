import express from "express"
import rateLimit from "express-rate-limit"
import { login, register } from "../controllers/authController.js"

const router = express.Router()

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5
})

router.post("/login", loginLimiter, login)
router.post("/register", register)

export default router;