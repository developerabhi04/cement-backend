import { TryCatch } from "../middleware/error.js";
import User from "../model/User.js"


export const registerForm = TryCatch(async (req, res, next) => {


    const { name, contactNumber, alternateNumber, cementName, quantity, city, state, pinCode } = req.body;


    const user = await User.create({
        name,
        contactNumber,
        alternateNumber,
        cementName,
        quantity,
        city,
        state,
        pinCode
    })


    res.json({
        success: true,
        message: 'Thank! you for submitting the form Sucessfully, We will get back to you shortly.',
        user,
    })
})


export const formData = TryCatch(async (req, res, next) => {

    const users = await User.find()

    res.status(200).json({
        success: true,
        users,
    });

})



export const deleteUser = TryCatch(async (req, res, next) => {

    const deleteUser = await User.findById(req.params.id);

    await deleteUser.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully!"
    })

}
)