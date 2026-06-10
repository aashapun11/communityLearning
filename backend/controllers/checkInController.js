const CheckIn = require('../models/CheckInModel');
const Challenge = require('../models/ChallengeModel');
const AppError = require('../utils/AppError');

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
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

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

        res.status(201).json({
            message: "Check-in created successfully",
            checkIn
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { createCheckIn };