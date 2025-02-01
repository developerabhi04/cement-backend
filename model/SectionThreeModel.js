import mongoose from "mongoose";

const sectionThreeSchema = new mongoose.Schema(
    {
        hOne: {
            type: String,
            required: true,
        },
        hTwo: {
            type: String,
            required: true,
        },
        contentOne: {
            type: String,
            required: true,
        },
        contentTwo: {
            type: String,
            required: true,
        },
        contentThree: {
            type: String,
            required: true,
        },
        contentFour: {
            type: String,
            required: true,
        },
        QuestionOne: {
            type: String,
            required: true,
        },
        AnswerOne: {
            type: String,
            required: true,
        },
        QuestionTwo: {
            type: String,
            required: true,
        },
        AnswerTwo: {
            type: String,
            required: true,
        },
        QuestionThree: {
            type: String,
            required: true,
        },
        AnswerThree: {
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

const SectionThree = mongoose.model("SectionThree", sectionThreeSchema);

export default SectionThree;

