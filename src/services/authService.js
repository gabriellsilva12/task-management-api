import User from "../models/User.js"
import validateEmail from "../utils/validateEmail.js"
import bcrypt from "bcryptjs";
import validateName from "../utils/validateName.js";
import validatePassword from "../utils/validatePassword.js";

const registerService = async (name, email, password) => {

    email = await validateEmail(email);

    const existingEmail = await User.findOne({ where: { email } })

    if (existingEmail) {
        throw new Error("Invalid email or password")
    };

    name = validateName(name);
    password = validatePassword(password);
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
}

export default registerService