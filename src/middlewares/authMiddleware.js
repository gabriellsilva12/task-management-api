import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const authMiddleware = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return res.status(401).json({ error: "Token not provided" })
        }
        
        const token = authHeader.split(" ")[1]
        if(!token) {
            return res.status(401).json({ error: "Invalid token" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: "Invalid or expired token" })
    }

}

export default authMiddleware