const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const { DateTime } = require('luxon');

const generateToken = require('../utils/generateToken');
    const registerUser = async (req, res, next) => {
    try {
        const { name, email, username, password, timezone} = req.body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
        if (existingUser.email === email) {
            return next(new AppError("Email already exists", 400));
        }

        if (existingUser.username === username) {
            return next(new AppError("Username already exists", 400));
        }
        }

        const newUser = new User({ name, email, username, password, timezone });
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
        }).select( 'password name email role currentStreak longestStreak lastCheckInDate timezone');

        if (!user) {
            return next(new AppError("User not found", 404));
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new AppError("Invalid credentials", 401));
        }

        // calculate real time streak
        const today = DateTime.now().setZone(user.timezone).startOf('day');

        const lastDate = user.lastCheckInDate
            ? DateTime.fromJSDate(user.lastCheckInDate)
                .setZone(user.timezone).startOf('day')
            : null;

        let currentStreak = user.currentStreak;

        if (lastDate) {
            const diffDays = today.diff(lastDate, 'days').days;
            if (Math.round(diffDays) > 1) currentStreak = 0;
}


        res.status(200).json({ message: "Login successful",
             token: generateToken(user._id),
             user: {
                id: user._id,
                name: user.name,
                email: user.email,
             },
            streak: {
            currentStreak,
            longestStreak: user.longestStreak
            }
            
            });
    } catch (err) {
        next(err);
    }
};



const authController = {registerUser, loginUser};

module.exports = authController