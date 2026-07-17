const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"],
    },
    intention: {
        type: String,
        required: [true, "Intention behind question is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false });


const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioural question is required"],
    },
    intention: {
        type: String,
        required: [true, "Intention behind question is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill name is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity level is required"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day number is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus area is required"]
    },
    tasks: {
        type: [String],
        default: []
    }
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },
    resume: {
        type: String,
        default: ""
    },
    selfDescription: {
        type: String,
        default: ""
    },
    matchScore: {
        type: Number,
        min: [0, "Match score cannot be less than 0"],
        max: [100, "Match score cannot exceed 100"],
        required: [true, "Match score is required"]
    },
    technicalQuestions: {
        type: [technicalQuestionSchema],
        default: []
    },
    behaviouralQuestions: {
        type: [behaviouralQuestionSchema],
        default: []
    },
    skillGaps: {
        type: [skillGapSchema],
        default: []
    },
    preparationPlan: {
        type: [preparationPlanSchema],
        default: []
    }
}, { timestamps: true });

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = InterviewReport;