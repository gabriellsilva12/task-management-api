import User from "./User.js";
import Task from "./Task.js";

User.hasMany(Task, {
    foreignKey: "userId",
    as: "tasks"
})

Task.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
})

export { User, Task }