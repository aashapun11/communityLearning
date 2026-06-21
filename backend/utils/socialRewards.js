const Follow = require('../models/FollowModel');
const {awardBadge} = require('./badgeEngine');
const processFollowRewards = async (followerId, followingId) => {
    const rewards = {
        totalCoinsEarned: 0,
        badgesEarned: []
    };

    // follower rewards (how many people YOU follow)
    const followingCount = await Follow.countDocuments({ follower: followerId });
    const followingMilestones = {
        5: 'social_butterfly',
        10: 'community_builder'
    };

    if (followingMilestones[followingCount]) {
        const result = await awardBadge(followerId, followingMilestones[followingCount]);
        if (result) {
            rewards.badgesEarned.push(result.badge);
            rewards.totalCoinsEarned += result.coinsAwarded;
        }
    }

    // following rewards (how many people follow THEM)
    const followerCount = await Follow.countDocuments({ following: followingId });
    const followerMilestones = {
        10: 'crowd_favorite',
        50: 'inspiration',
        100: 'role_model'
    };

    if (followerMilestones[followerCount]) {
        const result = await awardBadge(followingId, followerMilestones[followerCount]);
        if (result) {
            rewards.badgesEarned.push(result.badge);
            rewards.totalCoinsEarned += result.coinsAwarded;
        }
    }

    return rewards;
};