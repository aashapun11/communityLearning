const express = require('express');
const router = express.Router();
const { createCheckIn } = require('../controllers/checkInController');
const { createCheckInValidator } = require('../validators/checkInValidator');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');

router.post('/createCheckIn', protect, createCheckInValidator, validate, createCheckIn);

module.exports = router;