import mongoose from "mongoose";

const sectionOneSchema = new mongoose.Schema(
    {
        hOne: {
            type: String,
        },
        hTwo: {
            type: String,
        },
        content: {
            type: String,
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

const SectionOne = mongoose.model("SectionOne", sectionOneSchema);

export default SectionOne;
