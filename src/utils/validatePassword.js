import AppError from "../errors/AppError.js";

const rules = [
    (v) => v.length >= 8 && v.length <= 64, 
    (v) => !/\s/.test(v),                   
    (v) => /[A-Z]/.test(v),                 
    (v) => /[a-z]/.test(v),                 
    (v) => /[0-9]/.test(v),                 
    (v) => /[^A-Za-z0-9]/.test(v),          
]

const validatePassword = (password) => {
    const value = typeof password === "string" ? password : "";

    const isValid = rules.every((rule) => rule(value));

    if (!isValid) {
        throw new AppError("Invalid password", 400);
    }

    return value;
};

export default validatePassword;