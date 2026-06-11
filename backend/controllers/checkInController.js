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
            const startOfDay = new Date(today);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999);

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

        const isSameDay =
            today.getFullYear() === checkInDate.getFullYear() &&
            today.getMonth() === checkInDate.getMonth() &&
            today.getDate() === checkInDate.getDate();

        if (!isSameDay) {
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

        const isSameDay =
            today.getFullYear() === checkInDate.getFullYear() &&
            today.getMonth() === checkInDate.getMonth() &&
            today.getDate() === checkInDate.getDate();

        if (!isSameDay) {
            return next(new AppError("You can only delete today's check-in", 400));
        }

        await CheckIn.findByIdAndDelete(id);

        res.status(200).json({ message: "Check-in deleted successfully" });

    } catch (err) {
        next(err);
    }
};


module.exports = { createCheckIn, editCheckIn, deleteCheckIn };