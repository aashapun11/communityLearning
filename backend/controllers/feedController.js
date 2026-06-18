const Follow = require('../models/FollowModel');
const CheckIn = require('../models/CheckInModel');
const AppError = require('../utils/AppError');

const getActivityFeed = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // get all users you follow
        const following = await Follow.find({
            follower: req.user._id
        }).select('following');

        const followingIds = following.map(f => f.following);

        if (followingIds.length === 0) {
            return res.status(200).json({
                message: "Follow people to see their activity",
                checkIns: [],
                pagination: {
                    total: 0,
                    page: Number(page),
                    pages: 0
                }
            });
        }

       // only last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        // fetch their recent check-ins
        const checkIns = await CheckIn.find({
            userId: { $in: followingIds },
            createdAt: { $gte: thirtyDaysAgo }
        })
            .populate('userId', 'name username avatar')
            .populate('challengeId', 'title topic difficulty')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await CheckIn.countDocuments({
            userId: { $in: followingIds }
        });

        res.status(200).json({
            checkIns,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { getActivityFeed };