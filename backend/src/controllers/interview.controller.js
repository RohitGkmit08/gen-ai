const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service")
const interviewReportModel = require("../models/interview.model.js")

async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        
        const parser = new PDFParse({ data: req.file.buffer });
        const parsedPdf = await parser.getText();
        const resumeContent = parsedPdf.text;
        const { selfDescription, jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" });
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            users: req.user.id,
            resume: resumeContent,
            selfDescription: selfDescription,
            jobDescription: jobDescription,
            ...interviewReportByAi,
            behaviouralQuestions: interviewReportByAi.behaviouralQuestions || interviewReportByAi.behavioralQuestions
        });

        return res.status(201).json({
            message: "report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error generating report:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function generateInterViewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, users: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "interview report not found"
            });
        }

        return res.status(200).json({
            message: "interview report fetched successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error fetching report by ID:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ users: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan");

        return res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports
        });
    } catch (error) {
        console.error("Error fetching all reports:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
module.exports = {
    generateInterViewReportController, 
    generateInterViewReportByIdController,
    getAllInterviewReportsController
}