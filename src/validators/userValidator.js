import User from "../models/User.js";
import validateEmail from "../utils/validateEmail.js";
import validateName from "../utils/validateName.js";
import validatePassword from "../utils/validatePassword.js";

const validateRegisterData = async ({ name, email, password }) => {
    const data = {};

    data.name = validateName(name);
    data.email = await validateEmail(email);
    data.password = validatePassword(password);

    const existingEmail = await User.findOne({
        where: { email: data.email }
    });

    if (existingEmail) {
        throw new Error("Email already registered");
    }

    return data;
};

const validateLoginData = async ({ email, password }) => {
    return {
        email: await validateEmail(email),
        password: validatePassword(password)
    };
};

export { validateRegisterData, validateLoginData }