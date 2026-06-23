const CheckIn = require('../models/CheckInModel');
const Challenge = require('../models/ChallengeModel');
const Comment = require('../models/CommentModel');
const Follow = require('../models/FollowModel');
const AppError = require('../utils/AppError');

const getChallengeLeaderboard = async (req, res, next) => {
    try {
        const { challengeId } = req.params;

        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // get comment counts per user for this challenge
        const commentCounts = await Comment.aggregate([
            {
                $lookup: {
                    from: 'checkins',
                    localField: 'targetId',
                    foreignField: '_id',
                    as: 'checkIn'
                }
            },
            { $unwind: '$checkIn' },
            {
                $match: {
                    targetType: 'CheckIn',
                    'checkIn.challengeId': challenge._id
                }
            },
            {
                $group: {
                    _id: '$checkIn.userId',
                    totalComments: { $sum: 1 }
                }
            }
        ]);

        // map comments by userId for easy lookup
        const commentMap = {};
        commentCounts.forEach(c => {
            commentMap[c._id.toString()] = c.totalComments;
        });

        // main leaderboard aggregation
        const leaderboard = await CheckIn.aggregate([
            { $match: { challengeId: challenge._id } },
            {
                $group: {
                    _id: '$userId',
                    totalCheckIns: { $sum: 1 },
                    totalUpvotes: { $sum: { $size: '$upvotes' } }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    name: '$user.name',
                    username: '$user.username',
                    avatar: '$user.avatar',
                    currentStreak: '$user.currentStreak',
                    totalCheckIns: 1,
                    totalUpvotes: 1,
                    isCompleted: {
                        $gte: ['$totalCheckIns', challenge.duration]
                    }
                }
            },
            { $sort: { userId: 1 } }
        ]);

        // add comments + calculate final score
        const scored = leaderboard.map(entry => {
            const totalComments = commentMap[entry.userId.toString()] || 0;
            const score =
                (entry.totalCheckIns * 10) +
                (entry.currentStreak * 5) +
                (entry.isCompleted ? 100 : 0) +
                (entry.totalUpvotes * 2) +
                (totalComments * 1);

            return {
                ...entry,
                totalComments,
                score
            };
        });

        // sort by score
        scored.sort((a, b) => b.score - a.score);

        // add rank
        const ranked = scored.map((entry, index) => ({
            rank: index + 1,
            ...entry
        }));

        res.status(200).json({
            challenge: {
                title: challenge.title,
                topic: challenge.topic,
                difficulty: challenge.difficulty
            },
            leaderboard: ranked
        });

    } catch (err) {
        next(err);
    }
};

const getMonthlyLeaderboard = async (req, res, next) => {
    try {
        // start of current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // get comment counts per user this month
        const commentCounts = await Comment.aggregate([
            {
                $match: {
                    targetType: 'CheckIn',
                    createdAt: { $gte: startOfMonth }
                }
            },
            {
                $lookup: {
                    from: 'checkins',
                    localField: 'targetId',
                    foreignField: '_id',
                    as: 'checkIn'
                }
            },
            { $unwind: '$checkIn' },
            {
                $group: {
                    _id: '$checkIn.userId',
                    totalComments: { $sum: 1 }
                }
            }
        ]);

        const commentMap = {};
        commentCounts.forEach(c => {
            commentMap[c._id.toString()] = c.totalComments;
        });

        // main monthly aggregation
        const leaderboard = await CheckIn.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            {
                $group: {
                    _id: '$userId',
                    totalCheckIns: { $sum: 1 },
                    totalUpvotes: { $sum: { $size: '$upvotes' } },
                    challengesThisMonth: { $addToSet: '$challengeId' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    name: '$user.name',
                    username: '$user.username',
                    avatar: '$user.avatar',
                    currentStreak: '$user.currentStreak',
                    coins: '$user.coins',
                    totalCheckIns: 1,
                    totalUpvotes: 1,
                }
            }
        ]);

        // add comments + calculate score
        const scored = leaderboard.map(entry => {
            const totalComments = commentMap[entry.userId.toString()] || 0;
            const score =
                (entry.totalCheckIns * 10) +
                (entry.currentStreak * 5) +
                (entry.totalUpvotes * 2) +
                (totalComments * 1) ;

            return { ...entry, totalComments, score };
        });

        scored.sort((a, b) => b.score - a.score);

        const ranked = scored
            .slice(0, 50) // top 50
            .map((entry, index) => ({
                rank: index + 1,
                ...entry
            }));

        res.status(200).json({
            month: startOfMonth.toLocaleString('default', { month: 'long', year: 'numeric' }),
            leaderboard: ranked
        });

    } catch (err) {
        next(err);
    }
};


const getAllTimeLeaderboard = async (req, res, next) => {
    try {
        // get comment counts per user all time
        const commentCounts = await Comment.aggregate([
            { $match: { targetType: 'CheckIn' } },
            {
                $lookup: {
                    from: 'checkins',
                    localField: 'targetId',
                    foreignField: '_id',
                    as: 'checkIn'
                }
            },
            { $unwind: '$checkIn' },
            {
                $group: {
                    _id: '$checkIn.userId',
                    totalComments: { $sum: 1 }
                }
            }
        ]);

        const commentMap = {};
        commentCounts.forEach(c => {
            commentMap[c._id.toString()] = c.totalComments;
        });

        // get follower counts per user
        const followerCounts = await Follow.aggregate([
            {
                $group: {
                    _id: '$following',
                    totalFollowers: { $sum: 1 }
                }
            }
        ]);

        const followerMap = {};
        followerCounts.forEach(f => {
            followerMap[f._id.toString()] = f.totalFollowers;
        });

        // get completed challenges per user
        const challenges = await Challenge.find({ isActive: true })
            .select('_id duration participants');

        const completionMap = {};
        for (const challenge of challenges) {
            for (const participantId of challenge.participants) {
                const checkIns = await CheckIn.countDocuments({
                    userId: participantId,
                    challengeId: challenge._id
                });
                if (checkIns >= challenge.duration) {
                    const key = participantId.toString();
                    completionMap[key] = (completionMap[key] || 0) + 1;
                }
            }
        }

        // main all time aggregation
        const leaderboard = await CheckIn.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalCheckIns: { $sum: 1 },
                    totalUpvotes: { $sum: { $size: '$upvotes' } }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    name: '$user.name',
                    username: '$user.username',
                    avatar: '$user.avatar',
                    longestStreak: '$user.longestStreak',
                    coins: '$user.coins',
                    totalCheckIns: 1,
                    totalUpvotes: 1
                }
            }
        ]);

        // add comments + followers + completions → calculate score
         const scored = leaderboard.map(entry => {
            const totalComments = commentMap[entry.userId.toString()] || 0;
            const totalFollowers = followerMap[entry.userId.toString()] || 0;
            const completedChallenges = completionMap[entry.userId.toString()] || 0;
            const score =
                (entry.totalCheckIns * 10) +
                (entry.longestStreak * 5) +
                (completedChallenges * 100) +
                (entry.totalUpvotes * 2) +
                (totalComments * 1) +
                Math.min(totalFollowers * 3, 100); // capped at 100

            return {
                ...entry,
                totalComments,
                totalFollowers,
                completedChallenges,
                score
            };
        });

        scored.sort((a, b) => b.score - a.score);

        const ranked = scored
            .slice(0, 50)
            .map((entry, index) => ({
                rank: index + 1,
                ...entry
            }));

        res.status(200).json({
            leaderboard: ranked
        });

    } catch (err) {
        next(err);
    }
};


const getMostActiveChallenges = async (req, res, next) => {
    try {
        const mostActive = await CheckIn.aggregate([
            {
                $group: {
                    _id: '$challengeId',
                    totalCheckIns: { $sum: 1 },
                    uniqueParticipants: { $addToSet: '$userId' }
                }
            },
            {
                $lookup: {
                    from: 'challenges',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'challenge'
                }
            },
            { $unwind: '$challenge' },
            {
                $match: {
                    'challenge.isActive': true
                }
            },
            {
                $project: {
                    _id: 0,
                    challengeId: '$_id',
                    title: '$challenge.title',
                    topic: '$challenge.topic',
                    difficulty: '$challenge.difficulty',
                    totalCheckIns: 1,
                    totalParticipants: { $size: '$uniqueParticipants' }
                }
            },
            { $sort: { totalCheckIns: -1 } },
            { $limit: 10 }
        ]);

        res.status(200).json({ mostActiveChallenges: mostActive });

    } catch (err) {
        next(err);
    }
};

module.exports = { getChallengeLeaderboard, getMonthlyLeaderboard, getAllTimeLeaderboard, getMostActiveChallenges };

