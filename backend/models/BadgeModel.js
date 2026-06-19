const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: [
            // streak
            'first_flame', 'on_fire', 'unstoppable',
            'consistency_king', 'legendary',
            // check-ins
            'first_step', 'getting_started', 'half_century',
            'century_club', 'checkin_machine',
            // challenges
            'challenge_accepted', 'finisher', 'multi_tasker',
            'serial_finisher', 'challenge_master',
            // social
            'social_butterfly', 'community_builder',
            'crowd_favorite', 'inspiration', 'role_model',
            // topic
            'topic_complete' // ← covers ALL topics
        ],
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    metadata: {
        topic: { type: String, default: null } // ← stores which topic
    }
}, { timestamps: true });

// prevent duplicate badges
badgeSchema.index({ userId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Badge', badgeSchema);