import AppError from "../errors/AppError.js";

const rules = [
    (v) => v.length > 0,
    (v) => v.length <= 30,
    (v) => /^[\p{L}\s'-]+$/u.test(v),
];

const validateName = (name) => {
    const value = typeof name === "string" ? name.trim() : "";

    if (!rules.every((rule) => rule(value))) {
        throw new AppError("Invalid name", 400);
    }

    return value;
};

export default validateName;