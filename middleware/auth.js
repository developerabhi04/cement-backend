import { adminSecretKey } from "../app.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./errorHandler.js";


// export const isAuthenticated = async (req, res, next) => {
//     // console.log("cookies:",req.cookies);

//     const token = req.cookies["chatapp-token"];

//     if (!token) return next(new ErrorHandler("Please login to bypass!", 401));

//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//     // console.log(decodedData);
//     req.user = decodedData._id;


//     next();
// };



export const adminOnly = (req, res, next) => {
    const token = req.cookies["admin-token"];

    if (!token)
        return next(new ErrorHandler("Only Admin can access this route", 401));

    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched)
        return next(new ErrorHandler("Only Admin can access this route", 401));

    next();
};