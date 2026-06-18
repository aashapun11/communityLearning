const express = require('express');
const router = express.Router();
const { getActivityFeed } = require('../controllers/feedController');
const protect = require('../middleware/authMiddleware');

router.get('/home', protect, getActivityFeed);

module.exports = router;