const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

const generateToken = require('../utils/generateToken');
    const registerUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError("User already exists", 400));
        }

        const newUser = new User({ name, email, password});
        await newUser.save(); // bcrypt pre('save') hook triggers here

        res.status(201).json({ message: "User registered successfully" });
        
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new AppError("Invalid credentials", 401));
        }
        res.status(200).json({ message: "Login successful",
             token: generateToken(user._id),
             user: {
                id: user._id,
                name: user.name,
                email: user.email,
             }
            
            });
    } catch (err) {
        next(err);
    }
};

const getProfile = async (req, res) => {
    res.status(200).json({
        message: "Profile fetched",
        user: req.user  // comes from authMiddleware
    });
};


const authController = {registerUser, loginUser, getProfile};

module.exports = authController