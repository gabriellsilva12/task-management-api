import AppError from "../errors/AppError.js";
import { Task } from "../models/index.js";
import validateTaskData from "../validators/taskValidator.js";

const getUserTasks = async (userId) => {

    if (!userId) throw new AppError("Userid not found", 401)

    return Task.findAll({
        where: { userId: userId },
        order: [["createdAt", "ASC"]]
    })
}

const createUserTask = async ({ title, description, userId }) => {

    if (!userId) throw new AppError("Userid not found", 401)

    const validatedData = validateTaskData({ title, description })

    if (validatedData.title === undefined) {
        throw new AppError("Title is required", 400);
    }

    return Task.create({ ...validatedData, userId } );
}

const updateUserTask = async ({ idTask, userId, title, description, completed }) => {

    if (!userId) throw new AppError("Userid not found", 401)

    const validatedData = validateTaskData({ title, description, completed })

    const task = await Task.findOne({ where: { id: idTask, userId } });

    if (!task) throw new AppError("Task not found", 404);

    return Task.update(validatedData);
}

const deleteUserTask = async ({ idTask, userId }) => {

    if (!userId || !idTask) throw new AppError("Userid not found", 401)

    const task = await Task.findOne({ where: { id: idTask, userId: userId } });

    if (!task) {
        throw new AppError("Task not found", 404)
    }

    return Task.destroy()
}

export { getUserTasks, createUserTask, updateUserTask, deleteUserTask }