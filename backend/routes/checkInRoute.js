const express = require('express');
const router = express.Router();
const { createCheckIn, editCheckIn, deleteCheckIn, getChallengeFeed, getUserStreak, toggleUpvote } = require('../controllers/checkInController');
const { createCheckInValidator, editCheckInValidator } = require('../validators/checkInValidator');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');

router.post('/createCheckIn', protect, createCheckInValidator, validate, createCheckIn);
router.patch('/editCheckIn/:id', protect, editCheckInValidator, validate, editCheckIn);
router.delete('/deleteCheckIn/:id', protect, deleteCheckIn);
router.get('/challengeFeed/:id', getChallengeFeed); // public
router.get('/streak/:challengeId', protect, getUserStreak);
router.post('/upvote/:id', protect, toggleUpvote);

module.exports = router;