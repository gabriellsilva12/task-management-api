import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js"

const router = express.Router()

router.use(authMiddleware)

router.get("/", getTasks)
router.post("/", createTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router;