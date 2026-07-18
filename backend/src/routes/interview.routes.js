const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js")
const interviewRouter = express.Router();
const interviewController = require("../controllers/interview.controller.js")
const upload = require("../middleware/file.middleware.js")
/**
 * @route POST /api/interview/
 * @description - generate new interview report on the basis of user self description, resume
 * pdf and job description
 * @access private
 */

interviewRouter.post("/", 
    authMiddleware.authUser, 
    upload.single("resume"),
    interviewController.generateInterViewReportController)
module.exports = interviewRouter