const jwt = require("jsonwebtoken");
const tokenBlocklistModel = require("../models/blacklist.model.js");

async function authUser (req, res, next) {

    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "token not found"
        });
    }

    try{
        const isBlacklisted = await tokenBlocklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "token has been invalidated"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.jwt_secret);
        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({
            message: "invalid token"
        })
    }
}

module.exports = {authUser}