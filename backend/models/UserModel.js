const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
    type: String,
    required: true,
    unique: true
  },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String    
    },
    bio : {
        type: String    
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    timezone: {
    type: String,
    default: 'UTC'
   },
   currentStreak: {
    type: Number,
    default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    lastCheckInDate: {
        type: Date,
        default: null
    }
    });

// hash password before saving
UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password on login
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);