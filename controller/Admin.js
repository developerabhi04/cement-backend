import jwt from "jsonwebtoken";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../middleware/errorHandler.js";
import { adminSecretKey } from "../app.js";
import { cookieOptions } from "../config/db.js";
import User from "../model/User.js";



export const adminLogin = TryCatch(async (req, res, next) => {

    const { secretKey } = req.body;

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler("Invalid Admin key", 401));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res.status(200)
        .cookie("admin-token", token, {
            ...cookieOptions,
            maxAge: 1000 * 60 * 15,
        })
        .json({
            success: true,
            message: "Authenticated Successfully, Welcome Admin!",
        });
})


export const adminLogout = TryCatch(async (req, res, next) => {
    return res
        .status(200)
        .cookie("admin-token", "", {
            ...cookieOptions,
            maxAge: 0,
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});


export const getAdminData = TryCatch(async (req, res, next) => {
    return res.status(200).json({
        admin: true,
    });
});



export const getDashboardStats = TryCatch(async (req, res) => {
    const [usersCount, totalChatsCount] = await Promise.all([
        User.countDocuments(),
    ]);


    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await User.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        },
    }).select("createdAt");

    const messages = new Array(7).fill(0);
    const dayInMiliseconds = 1000 * 60 * 60 * 24;

    last7DaysMessages.forEach((message) => {
        const indexApprox = (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds;
        const index = Math.floor(indexApprox);

        messages[6 - index]++;
    });


    const stats = {
        usersCount,
        totalChatsCount,
        messagesChart: messages,
    };

    return res.status(200).json({
        success: true,
        stats,
    });
});