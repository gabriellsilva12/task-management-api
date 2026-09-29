import AppError from "../errors/AppError.js";

const errorMiddleware = (err, req, res, next) => {

    const isExpected = err instanceof AppError && err.isOperational;

    if (isExpected) {
        console.warn({
            error: err.message,
            status: err.statusCode,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
        });
    } else {
        console.error(err);
    }

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "Invalid JSON" });
    }

    if (isExpected) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal server error" });
};



export default errorMiddleware