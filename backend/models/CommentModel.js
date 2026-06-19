const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    targetType: {
        type: String,
        enum: ['CheckIn', 'Post'],
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 300
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null // null = top level comment, ObjectId = reply
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

commentSchema.index({ targetId: 1, targetType: 1 });

module.exports = mongoose.model('Comment', commentSchema);