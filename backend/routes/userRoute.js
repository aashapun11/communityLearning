const express = require('express');
const router = express.Router();
const { getUserProfile, getStreakStats, followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.get('/userProfile/:username', getUserProfile); // public
router.get('/streak/stats', protect, getStreakStats); // private
router.post('/follow/:userId', protect, followUser);
router.delete('/unfollow/:userId', protect, unfollowUser);
router.get('/followers/:userId', protect, getFollowers);
router.get('/following/:userId', protect, getFollowing);

module.exports = router;