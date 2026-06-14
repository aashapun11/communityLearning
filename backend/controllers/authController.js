const User = require('../models/UserModel');
const Challenge = require('../models/ChallengeModel');
const CheckIn = require('../models/CheckInModel');
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

const getUserProfile = async (req, res, next) => {
    try {
        const { username } = req.params;

        // find user by username
        const user = await User.findOne({ username }).select('-password -email');
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        // all challenges user joined
        const joinedChallenges = await Challenge.find({
            participants: user._id,
            isActive: true
        }).select('title topic difficulty duration startDate endDate');

        // total check-ins
        const totalCheckIns = await CheckIn.countDocuments({ userId: user._id });

        // active challenges with progress
        const today = new Date();
        const activeChallenges = await Promise.all(
            joinedChallenges
                .filter(c => today >= c.startDate && today <= c.endDate)
                .map(async (challenge) => {
                    const checkIns = await CheckIn.countDocuments({
                        userId: user._id,
                        challengeId: challenge._id
                    });
                    return {
                        title: challenge.title,
                        topic: challenge.topic,
                        difficulty: challenge.difficulty,
                        progressPercent: Math.min(100,
                            Math.floor((checkIns / challenge.duration) * 100)
                        ),
                        isCompleted: checkIns >= challenge.duration
                    };
                })
        );

        // completed challenges count
        const completedChallenges = activeChallenges.filter(c => c.isCompleted).length;

        res.status(200).json({
            user: {
                name: user.name,
                username: user.username,
                avatar: user.avatar,
                bio: user.bio,
                createdAt: user.createdAt
            },
            stats: {
                totalChallengesJoined: joinedChallenges.length,
                totalChallengesCompleted: completedChallenges,
                totalCheckIns,
            },
            activeChallenges
        });

    } catch (err) {
        next(err);
    }
};


const authController = {registerUser, loginUser, getUserProfile};

module.exports = authController