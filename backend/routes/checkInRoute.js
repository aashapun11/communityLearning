const express = require('express');
const router = express.Router();
const { createCheckIn, editCheckIn, deleteCheckIn, getChallengeFeed } = require('../controllers/checkInController');
const { createCheckInValidator, editCheckInValidator } = require('../validators/checkInValidator');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');

router.post('/createCheckIn', protect, createCheckInValidator, validate, createCheckIn);
router.patch('/editCheckIn/:id', protect, editCheckInValidator, validate, editCheckIn);
router.delete('/deleteCheckIn/:id', protect, deleteCheckIn);
router.get('/challengeFeed/:id', getChallengeFeed); // public


module.exports = router;