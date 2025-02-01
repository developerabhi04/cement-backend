import mongoose from "mongoose";

const sectionFourSchema = new mongoose.Schema(
    {

        hOne: {
            type: String,
        },
        hTwo: {
            type: String,
        },
        hThree: {
            type: String,
        },
        content: {
            type: String,
        }

    },
    {
        timestamps: true, // This adds createdAt and updatedAt fields automatically
    }
);

const SectionFour = mongoose.model("SectionFour", sectionFourSchema);

export default SectionFour;

