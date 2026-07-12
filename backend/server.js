const app = require("./src/app.js")
const connectDb = require("./src/config/db.js")
connectDb()
app.listen(3000, () => {
    console.log(`server is runnnig on port 3000`)
} )