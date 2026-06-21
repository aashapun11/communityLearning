const User = require('../models/UserModel');
const Challenge = require('../models/ChallengeModel');
const CheckIn = require('../models/CheckInModel');
const Follow = require('../models/FollowModel');
const AppError = require('../utils/AppError');
const { DateTime } = require('luxon');
const { processFollowRewards } = require('../utils/socialRewards');

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
                currentStreak: user.currentStreak,
                longestStreak: user.longestStreak  
            },
            activeChallenges
        });

    } catch (err) {
        next(err);
    }
};


const getStreakStats = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('currentStreak longestStreak lastCheckInDate timezone');

        const timezone = user.timezone || 'UTC';
        const today = DateTime.now().setZone(timezone).startOf('day');
        const lastDate = user.lastCheckInDate
            ? DateTime.fromJSDate(user.lastCheckInDate)
                .setZone(timezone).startOf('day')
            : null;

        // real time streak check
        let currentStreak = user.currentStreak;
        if (lastDate) {
            const diffDays = today.diff(lastDate, 'days').days;
            if (Math.round(diffDays) > 1) currentStreak = 0;
        }

        // total check-ins across all challenges
        const totalCheckIns = await CheckIn.countDocuments({
            userId: req.user._id
        });

        // last 7 days check-in history
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const day = DateTime.now().setZone(timezone).minus({ days: i }).startOf('day');
            const nextDay = day.plus({ days: 1 });

            const hasCheckIn = await CheckIn.exists({
                userId: req.user._id,
                date: {
                    $gte: day.toJSDate(),
                    $lt: nextDay.toJSDate()
                }
            });

    last7Days.push({
        date: day.toISODate(),
        checkedIn: !!hasCheckIn
    });
}
        res.status(200).json({
            currentStreak,
            longestStreak: user.longestStreak,
            lastCheckInDate: user.lastCheckInDate,
            totalCheckIns,
            last7Days
        });

    } catch (err) {
        next(err);
    }
};

const followUser = async (req, res, next) => {
    try {
        const { userId } = req.params; // user to follow

        // can't follow yourself
        if (userId === req.user._id.toString()) {
            return next(new AppError("You cannot follow yourself", 400));
        }

        // check if user exists
        const userToFollow = await User.findById(userId);
        if (!userToFollow) {
            return next(new AppError("User not found", 404));
        }

        // already following?
        const existingFollow = await Follow.findOne({
            follower: req.user._id,
            following: userId
        });
        if (existingFollow) {
            return next(new AppError("You are already following this user", 400));
        }

        await Follow.create({
            follower: req.user._id,
            following: userId
        });


        const rewards = await processFollowRewards(req.user._id, userId);

        res.status(201).json({
            message: "User followed successfully",
            rewards: {
                totalCoinsEarned: rewards.totalCoinsEarned,
                badgesEarned: rewards.badgesEarned
            }
        });

    } catch (err) {
        next(err);
    }
};

const unfollowUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // can't unfollow yourself
        if (userId === req.user._id.toString()) {
            return next(new AppError("You cannot unfollow yourself", 400));
        }

        // check if user exists
        const userToUnfollow = await User.findById(userId);
        if (!userToUnfollow) {
            return next(new AppError("User not found", 404));
        }

        // not following?
        const existingFollow = await Follow.findOne({
            follower: req.user._id,
            following: userId
        });
        if (!existingFollow) {
            return next(new AppError("You are not following this user", 400));
        }

        await Follow.findByIdAndDelete(existingFollow._id);

        res.status(200).json({ message: "User unfollowed successfully" });

    } catch (err) {
        next(err);
    }
};
const getFollowers = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalFollowers = await Follow.countDocuments({
        following: userId
        });

        const followers = await Follow.find({
            following: userId
        }).populate('follower', 'name username avatar')
        .skip(skip)
        .limit(limit);

    res.status(200).json({
    totalFollowers,
    totalPages: Math.ceil(totalFollowers / limit),
    currentPage: page,
    followers: followers.map(f => f.follower)
});

    } catch (err) {
        next(err);
    }
};
const getFollowing = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalFollowing = await Follow.countDocuments({
            follower: userId
        });

        const following = await Follow.find({
            follower: userId
        })
            .populate('following', 'name username avatar')
            .skip(skip)
            .limit(limit);

       res.status(200).json({
        totalFollowing,
        totalPages: Math.ceil(totalFollowing / limit),
        currentPage: page,
        following: following.map(f => f.following)
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { getUserProfile, getStreakStats, followUser, unfollowUser, getFollowers, getFollowing };