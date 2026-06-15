const calculateCurrentStreak = (checkIns) => {
    if (checkIns.length === 0) return 0;

    // sort by date newest → oldest
    const sorted = checkIns
        .map(c => new Date(c.date))
        .sort((a, b) => b - a);

    // normalize to midnight for comparison
    const toMidnight = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const today = toMidnight(new Date());
    const yesterday = toMidnight(new Date());
    yesterday.setDate(yesterday.getDate() - 1);

    // streak must start from today or yesterday
    const firstCheckIn = toMidnight(sorted[0]);
    if (firstCheckIn < yesterday) return 0;

    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
        const current = toMidnight(sorted[i]);
        const previous = toMidnight(sorted[i - 1]);

        const diffDays = Math.round(
            (previous - current) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 0) {
         continue; // ignore duplicates
        }
        if (diffDays === 1) {
            streak++;
        } else {
            break; // gap found → stop
        }
    }

    return streak;
};

const calculateLongestStreak = (checkIns) => {
    if (checkIns.length === 0) return 0;

    // sort oldest → newest
    const sorted = checkIns
        .map(c => new Date(c.date))
        .sort((a, b) => a - b);

    const toMidnight = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sorted.length; i++) {
        const current = toMidnight(sorted[i]);
        const previous = toMidnight(sorted[i - 1]);

        const diffDays = Math.round(
            (current - previous) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            currentStreak = 1; // reset
        }
    }

    return longestStreak;
};

module.exports = { calculateCurrentStreak, calculateLongestStreak };