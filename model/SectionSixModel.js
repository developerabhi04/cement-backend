import mongoose from "mongoose";

const sectionSixSchema = new mongoose.Schema(
    {
        hOne: {
            type: String,

        },
        hTwo: {
            type: String,

        },
        hThree: {
            type: String,

        }
    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);

const SectionSix = mongoose.model("SectionSix", sectionSixSchema);

export default SectionSix;
