import { adminSecretKey } from "../app.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./errorHandler.js";



export const adminOnly = (req, res, next) => {
    const token = req.cookies["admin-token"];

    if (!token) return next(new ErrorHandler("Only Admin can access this route", 401));

    try {
        const secretKey = jwt.verify(token, process.env.JWT_SECRET);
        const isMatched = secretKey === adminSecretKey;

        if (!isMatched)
            return next(new ErrorHandler("Only Admin can access this route", 401));

        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication failed", 401));
    }
};