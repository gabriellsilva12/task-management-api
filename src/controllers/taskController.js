import { getUserTasks, createUserTask, updateUserTask, deleteUserTask } from "../services/taskService.js"

const getTasks = async (req, res, next) => {
    try {
        const tasks = await getUserTasks(req.userId)

        res.status(200).json(tasks)

    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const task = await createUserTask({ 
            title, 
            description, 
            userId: req.userId,
        })

        res.status(201).json({ message: "Task successfully created", task });
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {]
    try {
        const userId = req.userId

        const { id: idTask } = req.params;
        const { title, description, completed } = req.body;

        const task = await updateUserTask({ idTask, userId, title, description, completed })

        res.status(200).json({ message: "Task successfully updated", task })
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const userId = req.userId;

        const { id: idTask } = req.params;

        await deleteUserTask({ idTask, userId });

        res.status(200).json({ message: "Task successfully deleted" })
    } catch (error) {
        next(error)
    }
}

export {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}