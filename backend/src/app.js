/**
 * Express Application Configuration
 * Initializes middleware, CORS policy, cookie parser, and primary API route handlers.
 */
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter)
module.exports = app;