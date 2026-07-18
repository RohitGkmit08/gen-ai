const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlocklistModel = require("../models/blacklist.model.js");

async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Account already exists with this username or email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: newUser._id,
                username: newUser.username
            },
            process.env.JWT_SECRET || process.env.jwt_secret,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getMeController (req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "user details fetched successfully",
            user : {
                id: user._id,
                username : user.username,
                email : user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET || process.env.jwt_secret,
            {expiresIn: "1d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function logoutUserController(req, res) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (token) {
            await tokenBlocklistModel.create({ token });
        }

        res.clearCookie("token", {
            httpOnly: true
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {registerUserController,loginUserController,logoutUserController, getMeController};