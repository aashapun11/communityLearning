const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

const generateToken = require('../utils/generateToken');
    const registerUser = async (req, res, next) => {
    try {
        const { name, email, username, password} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(new AppError("User already exists", 400));
        }

        const newUser = new User({ name, email, username, password});
        await newUser.save(); // bcrypt pre('save') hook triggers here

        res.status(201).json({ message: "User registered successfully" });
        
    } catch (err) {
        next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        
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



const authController = {registerUser, loginUser};

module.exports = authController