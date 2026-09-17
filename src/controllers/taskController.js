import { getUserTasks, createUserTask, updateUserTask, deleteUserTask } from "../services/taskService.js"

const getTasks = async (req, res) => {

    try {
        const tasks = await getUserTasks(req.userId)

        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ error: "Error retrieving task" })
    }

}

const createTask = async (req, res) => {

    try {
        const userId  = req.userId;
        const { title, description } = req.body;
        const task = await createUserTask(title, description, userId)

        res.status(201).json({ message: "Task successfully created", task });
    } catch (error) {
        return res.status(500).json({ error: "Error creating task" })
    }

}

const updateTask = async (req, res) => {

    try {
        const userIdToken = req.userId
        const { id: idParams } = req.params;
        const { title, description, completed } = req.body;
        
        const task = await updateUserTask(idParams, userIdToken, title, description, completed)

        res.json({ message: "Task successfully updated", task })
    } catch (error) {
        res.status(500).json({ error: "Erro updating task" })
    }

}

const deleteTask = async (req, res) => {

    try {
        const { id } = req.params

        const task = await deleteUserTask(id)

        res.json({ message: "Task successfully deleted", task })
    } catch (error) {
        res.status(500).json({ error: "Erro deleting task" })
    }

}

export {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}