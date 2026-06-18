const CheckIn = require('../models/CheckInModel');
const Challenge = require('../models/ChallengeModel');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const {getStartAndEndOfDay, isSameDay} = require('../utils/DateUtils');
const {updateUserStreak} = require('../utils/streakHelper');

const createCheckIn = async (req, res, next) => {
    try {
        const { challengeId, note, mediaUrl } = req.body;

        const challenge = await Challenge.findById(challengeId);

        // challenge exists?
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        const today = new Date();

        // challenge started?
        if (today < challenge.startDate) {
            return next(new AppError("Challenge has not started yet", 400));
        }

        // challenge ended?
        if (today > challenge.endDate) {
            return next(new AppError("Challenge has already ended", 400));
        }

        // is user a participant?
        const isParticipant = challenge.participants.includes(req.user._id);
        if (!isParticipant) {
            return next(new AppError("You are not a participant of this challenge", 400));
        }

        // one check-in per day
           const { startOfDay, endOfDay } = getStartAndEndOfDay();

        const existingCheckIn = await CheckIn.findOne({
            userId: req.user._id,
            challengeId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingCheckIn) {
            return next(new AppError("You have already checked in today", 400));
        }

        const checkIn = new CheckIn({
            userId: req.user._id,
            challengeId,
            note,
            mediaUrl,
            date: new Date()
        });

        await checkIn.save();

        //Update Streak after new checkin-in
        const { currentStreak, longestStreak } = await updateUserStreak(req.user._id, req.user.timezone);

        res.status(201).json({
            message: "Check-in created successfully",
            checkIn,
            streak: {
                currentStreak,
                longestStreak
            }
        });

    } catch (err) {
        next(err);
    }
};

const editCheckIn = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { note, mediaUrl } = req.body;

        const checkIn = await CheckIn.findById(id);

        // check-in exists?
        if (!checkIn) {
            return next(new AppError("Check-in not found", 404));
        }

        // only owner can edit
        if (checkIn.userId.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to edit this check-in", 403));
        }

        // only same day edit allowed
        const today = new Date();
        const checkInDate = new Date(checkIn.date);

        if (!isSameDay(today, checkInDate)) {
        return next(new AppError("You can only edit today's check-in", 400));
        }

        checkIn.note = note || checkIn.note;
        checkIn.mediaUrl = mediaUrl ?? checkIn.mediaUrl;

        await checkIn.save();

        res.status(200).json({
            message: "Check-in updated successfully",
            checkIn
        });

    } catch (err) {
        next(err);
    }
};

const deleteCheckIn = async (req, res, next) => {
    try {
        const { id } = req.params;

        const checkIn = await CheckIn.findById(id);

        // check-in exists?
        if (!checkIn) {
            return next(new AppError("Check-in not found", 404));
        }

        // only owner can delete
        if (checkIn.userId.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to delete this check-in", 403));
        }

        // only same day deletion allowed
        const today = new Date();
        const checkInDate = new Date(checkIn.date);

       if (!isSameDay(today, checkInDate)) {
        return next(new AppError("You can only edit today's check-in", 400));
        }

        await CheckIn.findByIdAndDelete(id);

        res.status(200).json({ message: "Check-in deleted successfully" });

    } catch (err) {
        next(err);
    }
};

const getChallengeFeed = async (req, res, next) => {
    try {
        const { id } = req.params;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const challenge = await Challenge.findById(id);
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        const skip = (page - 1) * limit;

        const checkIns = await CheckIn.find({ challengeId: id  })
            .populate('userId', 'name avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await CheckIn.countDocuments({ challengeId: id  });

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

const getUserStreak = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('currentStreak longestStreak');

        res.status(200).json({
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak
        });

    } catch (err) {
        next(err);
    }
};

const toggleUpvote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const checkIn = await CheckIn.findById(id);
        if (!checkIn) {
            return next(new AppError("Check-in not found", 404));
        }

        // can't upvote your own check-in
        if (checkIn.userId.toString() === req.user._id.toString()) {
            return next(new AppError("You cannot upvote your own check-in", 400));
        }

        const alreadyUpvoted = checkIn.upvotes.includes(req.user._id);

        if (alreadyUpvoted) {
            // remove upvote
            checkIn.upvotes = checkIn.upvotes.filter(
                id => id.toString() !== req.user._id.toString()
            );
        } else {
            // add upvote
            checkIn.upvotes.push(req.user._id);
        }

        await checkIn.save();

        res.status(200).json({
            message: alreadyUpvoted ? "Upvote removed" : "Upvoted successfully",
            totalUpvotes: checkIn.upvotes.length
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { createCheckIn, editCheckIn, deleteCheckIn, getChallengeFeed, getUserStreak, toggleUpvote };