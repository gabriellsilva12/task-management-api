import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import User from "../models/User.js"
import registerService from "../services/authService.js"

config()

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const user = await registerService( name, email, password )

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(400).json({ error: "Error registering user" })
    }

}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password"})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(400).json({ error: "Login error" })
    }

}

export { register, login }