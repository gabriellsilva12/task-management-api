import AppError from "../errors/AppError.js";
import validateEmail from "../utils/validateEmail.js";
import validateName from "../utils/validateName.js";
import validatePassword from "../utils/validatePassword.js";

const validateRegisterData = async ({ name, email, password }) => {
    return {
        name: validateName(name),
        email: await validateEmail(email),
        password: validatePassword(password),
    };
};

const validateLoginData = ({ email, password }) => {
    if (
        typeof email !== "string" || email.trim() === "" ||
        typeof password !== "string" || password === ""
    ) {
        throw new AppError("Email and password are required", 400);
    }

    return { email: email.trim().toLowerCase(), password };
};

export { validateRegisterData, validateLoginData };