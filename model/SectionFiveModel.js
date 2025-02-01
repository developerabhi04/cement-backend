import mongoose from "mongoose";

const sectionFiveSchema = new mongoose.Schema(
    {
        hOne: {
            type: String,
        },
        hTwo: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        cardUrl: {
            type: String,
            required: true,
        }

    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);

const SectionFive = mongoose.model("SectionFive", sectionFiveSchema);

export default SectionFive;

