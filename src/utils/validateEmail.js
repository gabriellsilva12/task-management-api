import dns from "node:dns/promises";
import emailValidator from "node-email-verifier";
import AppError from "../errors/AppError.js";

const validateEmail = async (email) => {
    const value = typeof email === "string" ? email.trim().toLowerCase() : "";

    const result = await emailValidator(value, {
        checkMx: false,
        checkDisposable: true,
        detailed: true,
    });

    if (!result.valid) {
        throw new AppError("Invalid email", 400);
    }

    let records = [];
    try {
        records = await dns.resolveMx(value.split("@")[1]);
    } catch {
        console.log("MX lookup failed:", err.message)
    }

    if (records.length === 0) {
        throw new AppError("Invalid email", 400);
    }

    return value;
};

export default validateEmail;