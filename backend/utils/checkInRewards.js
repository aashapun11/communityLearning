const User = require('../models/UserModel');
const CheckIn = require('../models/CheckInModel');
const { awardBadge } = require('./badgeEngine');

const processCheckInRewards = async (userId, currentStreak) => {
    const rewards = {
        totalCoinsEarned: 0,
        coinBreakdown: [],
        badgesEarned: []
    };

   // base coin
    await User.findByIdAndUpdate(userId, { $inc: { coins: 1 } });
    rewards.totalCoinsEarned += 1;
    rewards.coinBreakdown.push({ reason: 'Daily check-in', coins: 1 });

    // total check-ins
    const totalCheckIns = await CheckIn.countDocuments({ userId });

    // check-in milestone badges
    const checkInMilestones = {
        1: 'first_step',
        10: 'getting_started',
        25: 'building_momentum',
        50: 'half_century',
        75: 'dedicated_learner',
        100: 'century_club',
        150: 'elite_learner',
        200: 'checkin_machine'
    };

    if (checkInMilestones[totalCheckIns]) {
        const result = await awardBadge(userId, checkInMilestones[totalCheckIns]);
       // badge coins
    if (result) {
        rewards.badgesEarned.push(result.badge);
        rewards.totalCoinsEarned += result.coinsAwarded;
        rewards.coinBreakdown.push({ 
            reason: `${result.badge.title} Badge`, 
            coins: result.coinsAwarded 
        });
    }
    }

    // streak milestone badges
    const streakMilestones = {
        3: 'first_flame',
        7: 'on_fire',
        14: 'unstoppable',
        30: 'consistency_king',
        60: 'legendary'
    };

     if (streakMilestones[currentStreak]) {
        const result = await awardBadge(userId, streakMilestones[currentStreak]);
        if (result) {
        rewards.badgesEarned.push(result.badge);
        rewards.totalCoinsEarned += result.coinsAwarded;
        rewards.coinBreakdown.push({ 
            reason: `${result.badge.title} Badge`, 
            coins: result.coinsAwarded 
        });
       }
    }


    return rewards;
};

module.exports = { processCheckInRewards };