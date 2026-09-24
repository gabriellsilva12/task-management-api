import { registerService, loginService } from "../services/authService.js";

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerService(name, email, password);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await loginService(email, password);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export { register, login };