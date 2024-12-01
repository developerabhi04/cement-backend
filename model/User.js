import mongoose from "mongoose";



const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: Number,
            required: true,
        },
        alternateNumber: {
            type: Number,
            required: true,
        },
        cementName: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: Number,
        }

    },

    {
        timestamps: true, // This will automatically add createdAt and updatedAt fields
    }
)


const User = mongoose.model("User", UserSchema);


export default User;