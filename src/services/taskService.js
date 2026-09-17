import { where } from "sequelize";
import Task from "../models/Task.js";

const getUserTasks = async (userIdTasks) => {
    const tasks = await Task.findAll({
        where: { userId: userIdTasks },
        as: "ASC"
    })

    return tasks
}

const createUserTask = async (title, description, userId) => {

    if (!userId) return console.error("Error create task");

    const task = await Task.create({
        title,
        description,
        userId
    })

    return task
}

const updateUserTask = async (idParams, userIdToken, title, description, completed) => {

    const task = await Task.findOne({
        where: {
            id: idParams,
            userId: userIdToken
        }
    });

    if (!task) {
        throw new Error("Task not found");
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