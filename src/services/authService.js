import User from "../models/User.js"
import validateEmail from "../utils/validateEmail.js"
import bcrypt from "bcryptjs";
import validateName from "../utils/validateName.js";
import validatePassword from "../utils/validatePassword.js";

const registerService = async (name, email, password) => {

    name = validateName(name);
    password = validatePassword(password);
    email = await validateEmail(email);

    if (!name) {
        throw new Error("Invalid name");
    };

    if (!password) {
        throw new Error("Invalid password");
    };
    
    if (!email) {
        throw new Error("Invalid e-mail");
    };
    
    const existingEmail = await User.findOne({ where: { email } })
    if (existingEmail) {
        throw new Error("Invalid email or password")
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
}

export default registerService