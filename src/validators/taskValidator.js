import validateText from "../utils/validateText.js";

const validateTaskData = ({ title, description, completed }) => {

    const data = {};

    if (title !== undefined) {
        data.title = validateText(title);
    }

    if (description !== undefined) {
        data.description = validateText(description);
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            throw new Error("Completed must be a boolean");
        }

        data.completed = completed;
    }

    return data;
};

export default validateTaskData