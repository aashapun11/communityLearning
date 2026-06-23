const Badge = require('../models/BadgeModel');
const User = require('../models/UserModel');
const {createNotification} = require('./notificationHelper');

const BADGE_DEFINITIONS = {
    // streak badges
    first_flame: { title: 'First Flame', description: 'Maintained a 3 day streak 🔥', coins: 5 },
    on_fire: { title: 'On Fire', description: 'Maintained a 7 day streak 🔥', coins: 10 },
    unstoppable: { title: 'Unstoppable', description: 'Maintained a 14 day streak 💪', coins: 20 },
    consistency_king: { title: 'Consistency King', description: 'Maintained a 30 day streak 👑', coins: 50 },
    legendary: { title: 'Legendary', description: 'Maintained a 60 day streak 🏆', coins: 100 },

    // check-in badges
    first_step: { title: 'First Step', description: 'First ever check-in 🌱', coins: 5 },
    getting_started: { title: 'Getting Started', description: '10 total check-ins 🚀', coins: 10 },
    building_momentum: { title: 'Building Momentum', description: '25 total check-ins 💫', coins: 20 },
    half_century: { title: 'Half Century', description: '50 total check-ins 🏅', coins: 30 },
    dedicated_learner: { title: 'Dedicated Learner', description: '75 total check-ins 💪', coins: 40 },
    century_club: { title: 'Century Club', description: '100 total check-ins 🏆', coins: 50 },
    elite_learner: { title: 'Elite Learner', description: '150 total check-ins ⭐', coins: 75 },
    checkin_machine: { title: 'Check-in Machine', description: '200 total check-ins 🤖', coins: 100 },

    // challenge badges
    challenge_accepted: { title: 'Challenge Accepted', description: 'Joined first challenge 🎯', coins: 5 },
    finisher: { title: 'Finisher', description: 'Completed first challenge 🏆', coins: 20 },
    multi_tasker: { title: 'Multi-tasker', description: 'Joined 3 challenges simultaneously 💪', coins: 15 },
    serial_finisher: { title: 'Serial Finisher', description: 'Completed 3 challenges 🎯', coins: 40 },
    challenge_master: { title: 'Challenge Master', description: 'Completed 5 challenges 👑', coins: 75 },

    // social badges
    social_butterfly: { title: 'Social Butterfly', description: 'Followed 5 people 🦋', coins: 10 },
    community_builder: { title: 'Community Builder', description: 'Followed 10 people 🏘️', coins: 20 },
    crowd_favorite: { title: 'Crowd Favorite', description: 'Got 10 followers ⭐', coins: 15 },
    inspiration: { title: 'Inspiration', description: 'Got 50 followers 💫', coins: 40 },
    role_model: { title: 'Role Model', description: 'Got 100 followers 🏆', coins: 75 },

    // topic badge
    topic_complete: { title: 'Topic Master', description: 'Completed a topic challenge 📚', coins: 25 },
};

const awardBadge = async (userId, type, metadata = {}) => {
    try {
        const definition = BADGE_DEFINITIONS[type];
        if (!definition) return null;

        // check if already awarded
        const existing = await Badge.findOne({
            userId,
            type,
            'metadata.topic': metadata.topic || null
        });
        if (existing) return null; // already has badge

        // create badge
        const badge = await Badge.create({
            userId,
            type,
            title: metadata.topic
                ? `${metadata.topic.charAt(0).toUpperCase() + metadata.topic.slice(1)} Master`
                : definition.title,
            description: definition.description,
            metadata: { topic: metadata.topic || null }
        });

        // award bonus coins for badge
        await User.findByIdAndUpdate(userId, {
            $inc: { coins: definition.coins }
        });

        //create notification

        await createNotification(
        userId,
        'badge_earned',
        `You earned the ${definition.title} badge! 🏆`,
        badge._id,
        'Badge'
    );
        
        return { badge, coinsAwarded: definition.coins };

    } catch (err) {
        if (err.code === 11000) return null; // duplicate → ignore
        throw err;
    }
};

module.exports = { awardBadge, BADGE_DEFINITIONS };