import mongoose from "mongoose";
import jwt from "jsonwebtoken"


export const connectDb = (uri) => {
    mongoose.connect(uri, {
        dbName: "Adani"
    }).then((c) => {
        console.log(`Database is connected ${c.connection.host}`);
    }).catch((error) => {
        console.log(error);
    })
}




// export const cookieOptions = {
//     maxAge: 15 * 24 * 60 * 60 * 1000,
//     sameSite: "none",
//     httpOnly: true,
//     secure: true,
// }


// export const sendToken = (res, user, code, message) => {

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

//     console.log(token);

//     return res.status(code).cookie("user-token", token, cookieOptions).json({
//         success: true,
//         message,
//     })

// }




















// genrating cookies
// export const cookieOptions = {
//     maxAge: 15 * 24 * 60 * 60 * 1000,
//     sameSite: "none",
//     httpOnly: true,
//     secure: true,
// }


// export const sendToken = (res, user, code, message) => {

//     const token = jwt.sign({ _id: user._id }, "process.env.JWT_SECRET");

//     console.log(token);

//     // return res.status(code).cookie("user-token", token, cookieOptions).json({
//     //     success: true,
//     //     message,
//     // })

// }

// sendToken("asdf", { _id: "hnjn" }, 201, "User created")

