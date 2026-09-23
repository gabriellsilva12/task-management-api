import Task from "../models/Task.js";
import validateTaskData from "../validators/taskValidator.js";

const getUserTasks = async (userId) => {

    if (!userId) throw new Error("Error create task")

    const tasks = await Task.findAll({
        where: { userId: userId },
        order: [["createdAt", "ASC"]]
    })

    return tasks
}

const createUserTask = async ({ title, description, userId }) => {

    if (!userId) throw new Error("Error create task")

    const validatedData = validateTaskData({ title, description })

    validatedData.userId = userId;

    const task = await Task.create(validatedData);

    return task
}

const updateUserTask = async ({ idTask, userId, title, description, completed }) => {

    if (!userId) throw new Error("Error create task")

    const validatedData = validateTaskData({ title, description, completed })

    const task = await Task.findOne({
        where: {
            id: idTask,
            userId: userId
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    await task.update(validatedData);

    return task
}

const deleteUserTask = async ({ idTask, userId }) => {

    if (!userId || !idTask) throw new Error("Error create task")

    const task = await Task.findOne({
        where: {
            id: idTask,
            userId: userId
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    await task.destroy()

    return task
}

export { getUserTasks, createUserTask, updateUserTask, deleteUserTask }