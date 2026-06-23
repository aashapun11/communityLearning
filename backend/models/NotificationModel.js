const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: [
            'follow',
            'upvote',
            'comment',
            'badge_earned',
            'challenge_complete'
        ],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    relatedType: {
        type: String,
        enum: ['User', 'CheckIn', 'Badge', 'Challenge', null],
        default: null
    }
}, { timestamps: true });

notificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);