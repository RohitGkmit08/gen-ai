const express = require("express")
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRouter = require("./routes/auth.routes.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

module.exports = app;