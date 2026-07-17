const app = require("./src/app.js")
const connectDb = require("./src/config/db.js")
const {resume, selfDescription, jobDescription} = require("./src/services/temp.js")
const { generateInterviewReport } = require("./src/services/ai.service.js")

connectDb()

generateInterviewReport({resume, selfDescription, jobDescription})
app.listen(3000, () => {
    console.log(`server is runnnig on port 3000`)
} )