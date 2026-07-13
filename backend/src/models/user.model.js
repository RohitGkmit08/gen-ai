const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        required:true,
    },
    email: {
        type:String,
        unique: true,
        required: true
    },

    password:{
        type: String,
        required: true
    }
})

// mongoose.model(_,_) registers a schema with Mongoose and compiles it into a model
// A model is a JavaScript class that gives you access to MongoDB methods like .find(), .create(), .updateOne(), and .deleteMany().
const userModel = mongoose.model("users", userSchema)
module.exports = userModel;