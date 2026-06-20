const Challenge = require('../models/ChallengeModel');
const CheckIn = require('../models/CheckInModel');
const AppError = require('../utils/AppError');
const { processJoinRewards } = require('../utils/challengeRewards');


const createChallenge = async (req, res, next) => {
    try {
        const { title, topic, description, difficulty, duration, startDate, isPublic } = req.body;

        // calculate endDate automatically
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + duration);

        const challenge = new Challenge({
            title,
            topic,
            description,
            difficulty,
            duration,
            startDate: start,
            endDate: end,
            isPublic,
            createdBy: req.user._id  // comes from JWT middleware
        });

        await challenge.save();

        res.status(201).json({
            message: "Challenge created successfully",
            challenge
        });

    } catch (err) {
        next(err);
    }
};

const updateChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, topic, description, difficulty, duration, startDate, isPublic } = req.body;

        // find challenge
        const challenge = await Challenge.findById(id);

        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // only creator can update
        if (challenge.createdBy.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to update this challenge", 403));
        }

        // lock if participants have joined
        if (challenge.participants.length > 0) {
            return next(new AppError("Cannot update challenge once participants have joined", 400));
        }

        // recalculate endDate if startDate or duration changes
        const start = new Date(startDate || challenge.startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + (duration || challenge.duration));

        challenge.title = title || challenge.title;
        challenge.topic = topic || challenge.topic;
        challenge.description = description || challenge.description;
        challenge.difficulty = difficulty || challenge.difficulty;
        challenge.duration = duration || challenge.duration;
        challenge.startDate = start;
        challenge.endDate = end;
        challenge.isPublic = isPublic ?? challenge.isPublic; //if undefined or null, use existing value

        await challenge.save();

        res.status(200).json({
            message: "Challenge updated successfully",
            challenge
        });

    } catch (err) {
        next(err);
    }
};

const deleteChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;

        // find challenge
        const challenge = await Challenge.findById(id);
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // only creator can delete
        if (challenge.createdBy.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to delete this challenge", 403));
        }

        // hard delete if no participants
        if (challenge.participants.length === 0) {
            await Challenge.findByIdAndDelete(id);
            return res.status(200).json({ message: "Challenge deleted successfully" });
        }

        // soft delete if participants exist
        challenge.isActive = false;
        await challenge.save();

        res.status(200).json({ message: "Challenge archived successfully" });

    } catch (err) {
        next(err);
    }
};

const getChallenges = async (req, res, next) => {
    try {
        const { topic, difficulty, search, page = 1, limit = 10 } = req.query;

        // build filter
        const filter = { isPublic: true, isActive: true };

        if (topic) filter.topic = topic;
        if (difficulty) filter.difficulty = difficulty;
        if (search) {
            filter.title = { $regex: search, $options: 'i' }; // case insensitive
        }

        const skip = (page - 1) * limit;

        const challenges = await Challenge.find(filter)
            .populate('createdBy', 'name avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Challenge.countDocuments(filter);

        res.status(200).json({
            challenges,
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

const getChallengeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findOne({ _id: id, isActive: true })
            .populate('createdBy', 'name avatar')
            .populate('participants', 'name avatar');

        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        const today = new Date();

        const daysPassed = Math.max(0,
            Math.floor((today - challenge.startDate) / (1000 * 60 * 60 * 24))
        );
        const daysRemaining = Math.max(0,
            Math.floor((challenge.endDate - today) / (1000 * 60 * 60 * 24))
        );
        const progressPercent = Math.min(100,
            Math.floor((daysPassed / challenge.duration) * 100)
        );

        let status;
        if (today < challenge.startDate) status = "upcoming";
        else if (today > challenge.endDate) status = "completed";
        else status = "ongoing";

         // user progress — only if logged in
        let userProgress = null;

        if (req.user) {
            const isParticipant = challenge.participants.some(
                p => p._id.toString() === req.user._id.toString()
            );

            if (isParticipant) {
                const totalCheckIns = await CheckIn.countDocuments({
                    userId: req.user._id,
                    challengeId: id
                });

                userProgress = {
                    totalCheckIns,
                    progressPercent: Math.min(100,
                        Math.floor((totalCheckIns / challenge.duration) * 100)
                    ),
                    isCompleted: totalCheckIns >= challenge.duration
                };
            }
        }

        res.status(200).json({
            challenge,
            stats: {
                totalParticipants: challenge.participants.length,
                daysPassed,
                daysRemaining,
                progressPercent,
                status
            },
            userProgress
        });

    } catch (err) {
        next(err);
    }
};
const joinChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findById(id);

        // challenge exists?
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // challenge active and public?
        if (!challenge.isActive || !challenge.isPublic) {
            return next(new AppError("Challenge is not available", 400));
        }

        // joining before startDate?
        const today = new Date();
        if (today >= challenge.startDate) {
            return next(new AppError("Challenge has already started, cannot join", 400));
        }

        // already joined?
        const alreadyJoined = challenge.participants.includes(req.user._id);
        if (alreadyJoined) {
            return next(new AppError("You have already joined this challenge", 400));
        }

        challenge.participants.push(req.user._id);
        await challenge.save();

        const rewards = await processJoinRewards(req.user._id);

        res.status(200).json(
            {message: "Successfully joined the challenge" ,
            rewards : {
                totalCoinsEarned: rewards.totalCoinsEarned,
                badgesEarned: rewards.badgesEarned
            }
        }
        );

    } catch (err) {
        next(err);
    }
};

const leaveChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findById(id);

        // challenge exists?
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // challenge ended?
        const today = new Date();
        if (today > challenge.endDate) {
            return next(new AppError("Challenge has already ended", 400));
        }

        // creator cannot leave
        if (challenge.createdBy.toString() === req.user._id.toString()) {
            return next(new AppError("Creator cannot leave their own challenge", 400));
        }

        // already not a participant?
        const isParticipant = challenge.participants.includes(req.user._id);
        if (!isParticipant) {
            return next(new AppError("You are not a participant of this challenge", 400));
        }

        // remove from participants
        challenge.participants = challenge.participants.filter(
            participant => participant.toString() !== req.user._id.toString()
        );

        await challenge.save();

        res.status(200).json({ message: "Successfully left the challenge" });

    } catch (err) {
        next(err);
    }
};

module.exports = { createChallenge, updateChallenge, deleteChallenge, getChallenges, getChallengeById, joinChallenge, leaveChallenge };