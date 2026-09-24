import AppError from "../errors/AppError.js";

const rules = [
    (v) => v.length > 0,
    (v) => v.length <= 500,
    (v) => !/<[^>]*>/.test(v),
];

const validateText = (text) => {
    const value = typeof text === "string" ? text.trim() : "";

    if (!rules.every((rule) => rule(value))) {
        throw new AppError("Invalid text", 400);
    }

    return value;
};

export default validateText;