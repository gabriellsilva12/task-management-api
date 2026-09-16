import Task from "../models/Task.js";

const getUserTasks = async (userIdTasks) => {
    const tasks = await Task.findAll({
        where: { userId: userIdTasks },
        as: "ASC"
    })

    return tasks
}

const createUserTask = async (title, description, userId) => {
    const task = await Task.create({
        title,
        description,
        userId
    })

    return task
}

const updateUserTask = async (id, userIdToken, title, description, completed) => {

    if (id ==! userIdToken) {
        return console.error("Task not found kkk");
    }

    const task = await Task.findOne({
        where: { id }
    })

    if (!task) {
        return console.error("Task not found");
    }

    await task.update({
        title: title || task.title,
        description: description !== undefined ? description : task.description,
        completed: completed !== undefined ? completed : task.completed
    })

    return task
}

const deleteUserTask = async (id) => {

    const task = await Task.findOne({
        where: { id }
    })

    if (!task) {
        return console.error("Task not found");
    }

    await task.destroy()

    return task
}

export { getUserTasks, createUserTask, updateUserTask, deleteUserTask }