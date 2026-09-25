import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

import { User } from "../models/index.js";
import AppError from "../errors/AppError.js";
import {
    validateRegisterData,
    validateLoginData,
} from "../validators/userValidator.js";


const registerService = async (name, email, password) => {

    const data = await validateRegisterData({ name, email, password });

    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({ ...data, password: hashedPassword });

    return { id: user.id, name: user.name, email: user.email };
};

const loginService = async (email, password) => {
    
    const data = validateLoginData({ email, password });

    const user = await User.findOne({ where: { email: data.email } });

    const validPassword = user ? await bcrypt.compare(data.password, user.password) : false;
    if (!validPassword) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
};

export { registerService, loginService };