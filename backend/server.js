const app = require("./src/app.js")
const connectDb = require("./src/config/db.js")
const invokeAI = require("./src/services/ai.service.js")
connectDb()
invokeAI()
app.listen(3000, () => {
    console.log(`server is runnnig on port 3000`)
} )