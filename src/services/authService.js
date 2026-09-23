import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { validateRegisterData, validateLoginData } from "../validators/userValidator.js";

const registerService = async (name, email, password) => {

    const validatedData = await validateRegisterData({ name, email, password })

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    validateData.password = hashedPassword

    const user = await User.create(validatedData);

    return user;
}

const loginService = async (email, password) => {

    const validatedData = await validateLoginData({ email, password })

    const user = await User.findOne({ where: { email: validatedData.email } })
    if (!user) {
        throw new Error("Invalid email or password")
    }

    const validPassword = await bcrypt.compare( validatedData.password, user.password );
    if (!validPassword) { 
        throw new Error("Invalid email or password")
    }

    return user
}


export { registerService, loginService }