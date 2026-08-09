const mongoose = require('mongoose');
const { topicCategories } = require("../constants/topicCategories.js");

const challengeSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
    trim: true
},

//    topic: {
//     type: String,
//     required: true,
//     // enum: ['algorithms', 'data-structures', 'javascript', 
//     //        'artificial-intelligence', 'c', 'c++', 'java', 
//     //        'python', 'node', 'sql', 'databases', 'linux-shell'],
//    },

topic: {
  type: String,
  required: true,
  enum: Object.values(topicCategories).flat(),
},
   
    description: {
        type: String,
        required: true
    },
    difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number, // in days
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxParticipants: {
    type: Number,
    default: null // null = unlimited
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isActive: { //currently active or not, if false, it means the challenge has ended
        type: Boolean,
        default: true
    }
},
{ timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);