import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        headingOne: {
            type: String,
            required: true,
        },
        headingTwo: {
            type: String,
            required: true,
        },
        paragraph: {
            type: String,
            required: true,
        },
        bannerUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
