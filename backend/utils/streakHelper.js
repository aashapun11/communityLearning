const { DateTime } = require('luxon');
const User = require('../models/UserModel');

const updateUserStreak = async (userId, timezone = 'UTC') => {
    const user = await User.findById(userId);

    const today = DateTime.now().setZone(timezone).startOf('day');
    const lastDate = user.lastCheckInDate
        ? DateTime.fromJSDate(user.lastCheckInDate).setZone(timezone).startOf('day')
        : null;

    let currentStreak = user.currentStreak;

    if (!lastDate) {
        currentStreak = 1; // first ever check-in
    } else {
        const diffDays = today.diff(lastDate, 'days').days;
        if (Math.round(diffDays) === 1) {
            currentStreak++; // consecutive day
        } else if (Math.round(diffDays) === 0) {
            // same day check-in (different challenge) → no change
        } else {
            currentStreak = 1; // missed day → reset
        }
    }

    const longestStreak = Math.max(currentStreak, user.longestStreak);

    await User.findByIdAndUpdate(userId, {
        currentStreak,
        longestStreak,
        lastCheckInDate: today.toJSDate()
    });

    return { currentStreak, longestStreak }; 
};

module.exports = { updateUserStreak };

// const toUserMidnight = (date, timezone) => {
//     return DateTime.fromJSDate(new Date(date))
//         .setZone(timezone)
//         .startOf('day');
// };

// const calculateCurrentStreak = (checkIns, timezone = 'UTC') => {
//     if (checkIns.length === 0) return 0;

//     // sort newest → oldest
//     const sorted = checkIns
//         .map(c => new Date(c.date))
//         .sort((a, b) => b - a);

//     const today = DateTime.now().setZone(timezone).startOf('day');
//     const yesterday = today.minus({ days: 1 });

//     // streak must start from today or yesterday
//     const firstCheckIn = toUserMidnight(sorted[0], timezone);
//     if (firstCheckIn.toMillis() < yesterday.toMillis()) return 0;

//     let streak = 1;
//     for (let i = 1; i < sorted.length; i++) {
//         const current = toUserMidnight(sorted[i], timezone);
//         const previous = toUserMidnight(sorted[i - 1], timezone);

//         const diffDays = previous.diff(current, 'days').days;

//         if (Math.round(diffDays) === 1) {
//             streak++;
//         } else {
//             break;
//         }
//     }

//     return streak;
// };

// const calculateLongestStreak = (checkIns, timezone = 'UTC') => {
//     if (checkIns.length === 0) return 0;

//     // sort oldest → newest
//     const sorted = checkIns
//         .map(c => new Date(c.date))
//         .sort((a, b) => a - b);

//     let longestStreak = 1;
//     let currentStreak = 1;

//     for (let i = 1; i < sorted.length; i++) {
//         const current = toUserMidnight(sorted[i], timezone);
//         const previous = toUserMidnight(sorted[i - 1], timezone);

//         const diffDays = current.diff(previous, 'days').days;

//         if (Math.round(diffDays) === 1) {
//             currentStreak++;
//             longestStreak = Math.max(longestStreak, currentStreak);
//         } else {
//             currentStreak = 1;
//         }
//     }

//     return longestStreak;
// };

// module.exports = { calculateCurrentStreak, calculateLongestStreak };