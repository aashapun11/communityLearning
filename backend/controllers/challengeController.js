const Challenge = require('../models/ChallengeModel');

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

module.exports = { createChallenge };