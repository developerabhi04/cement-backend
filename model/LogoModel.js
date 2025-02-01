import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);

const Logo = mongoose.model("Logo", logoSchema);

export default Logo;
