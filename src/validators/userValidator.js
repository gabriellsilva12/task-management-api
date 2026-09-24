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

const validateLoginData = async ({ email, password }) => {
    return {
        email: await validateEmail(email),
        password: validatePassword(password),
    };
};

export { validateRegisterData, validateLoginData };