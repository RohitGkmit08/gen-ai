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


module.exports = {generateInterViewReportController}