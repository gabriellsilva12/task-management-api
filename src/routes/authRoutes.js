import express from "express"
import rateLimit from "express-rate-limit"
import { login, register } from "../controllers/authController.js"

const router = express.Router()

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5
})

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,   // 1 hora
    limit: 10,                  // 10 cadastros por IP por hora
});

router.post("/login", loginLimiter, login)
router.post("/register", registerLimiter, register)

export default router;