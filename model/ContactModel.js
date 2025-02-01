import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);


const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
