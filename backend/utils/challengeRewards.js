const Challenge = require('../models/ChallengeModel');
const CheckIn = require('../models/CheckInModel');
const { awardBadge } = require('./badgeEngine');

const processJoinRewards = async (userId) => {
    // first challenge joined?
    const rewards = {
        totalCoinsEarned: 0,
        badgesEarned: []
    };
    
    const joinedCount = await Challenge.countDocuments({ participants: userId });

    if (joinedCount === 1) {
        const result = await awardBadge(userId, 'challenge_accepted');
        if (result) {
            rewards.badgesEarned.push(result.badge);
            rewards.totalCoinsEarned += result.coinsAwarded;
        }
    }

    // multi_tasker - 3 active challenges
    if (joinedCount === 3) {
        const result = await awardBadge(userId, 'multi_tasker');
        if (result) {
            rewards.badgesEarned.push(result.badge);
            rewards.totalCoinsEarned += result.coinsAwarded;
        }
    }

    return rewards;
};

const processCompletionRewards = async (userId, challenge) => {
    const rewards = {
        totalCoinsEarned: 0,
        badgesEarned: []
    };

    const totalCheckIns = await CheckIn.countDocuments({
        userId,
        challengeId: challenge._id
    });

    const isCompleted = totalCheckIns >= challenge.duration;
    if (!isCompleted) return null;

    // topic badge
    const topicResult = await awardBadge(userId, 'topic_complete', { topic: challenge.topic });
    if (topicResult) {
        rewards.badgesEarned.push(topicResult.badge);
        rewards.totalCoinsEarned += topicResult.coinsAwarded;
    }

    // completion count badges
    const completedCount = await getCompletedChallengesCount(userId);
    const completionMilestones = {
        1: 'finisher',
        3: 'serial_finisher',
        5: 'challenge_master'
    };

    if (completionMilestones[completedCount]) {
        const result = await awardBadge(userId, completionMilestones[completedCount]);
        if (result) {
            rewards.badgesEarned.push(result.badge);
            rewards.totalCoinsEarned += result.coinsAwarded;
        }
    }

    return rewards;
};
const getCompletedChallengesCount = async (userId) => {
    const challenges = await Challenge.find({ participants: userId });
    let count = 0;
    for (const challenge of challenges) {
        const checkIns = await CheckIn.countDocuments({
            userId,
            challengeId: challenge._id
        });
        if (checkIns >= challenge.duration) count++;
    }
    return count;
};

module.exports = { processJoinRewards, processCompletionRewards };