const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    note: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{ timestamps: true });

module.exports = mongoose.model('CheckIn', checkInSchema);