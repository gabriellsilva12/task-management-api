import Task from "../models/Task.js";
import validateText from "../utils/validateText.js";

const getUserTasks = async (userId) => {

    if (!userId) throw new Error("Error create task")

    const tasks = await Task.findAll({
        where: { userId: userId },
        as: "ASC"
    })

    return tasks
}

const createUserTask = async (title, description, userId) => {

    if (!userId) throw new Error("Error create task")

    title = validateText(title)
    description = validateText(description)

    if (!title || !description) throw new Error("Error create task")

    const task = await Task.create({
        title,
        description,
        userId
    })

    return task
}

const updateUserTask = async (idTask, userId, title, description, completed) => {

    if (!userId) throw new Error("Error create task")

    if (title !== undefined) {
        title = validateText(title);
    }

    if (description !== undefined) {
        description = validateText(description);
    }
    const task = await Task.findOne({
        where: {
            id: idTask,
            userId: userId
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    await task.update({
        title: title !== undefined ? title : task.title,
        description: description !== undefined
            ? description
            : task.description,
        completed: completed !== undefined
            ? completed
            : task.completed
    });

    return task
}

const deleteUserTask = async (idTask, userId) => {

    if (!userId) throw new Error("Error create task")

    const task = await Task.findOne({
        where: {
            id: idTask,
            userId: userId
        }
    });

    if (!task) {
        throw new Error("Task not found"); D
    }

    await task.destroy()

    return task
}

export { getUserTasks, createUserTask, updateUserTask, deleteUserTask }