import User from "../models/User.js"
import validateEmail from "../utils/validateEmail.js"
import bcrypt from "bcryptjs";

const registerService = async (name, email, password) => {

    const verifiedEmail = await validateEmail(email);

    if (!verifiedEmail) { 
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