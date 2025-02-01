import mongoose from "mongoose";

const sectionTwoSchema = new mongoose.Schema(
    {
        hOne: {
            type: String,
            required: true,
        },
        hTwo: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        cardUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);

const SectionTwo = mongoose.model("SectionTwo", sectionTwoSchema);

export default SectionTwo;
