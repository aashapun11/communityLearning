const express = require('express');
const router = express.Router();
const { createChallenge } = require('../controllers/challengeController');
const { createChallengeValidator } = require('../validators/challengeValidator');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');

router.post('/create', protect, createChallengeValidator, validate, createChallenge);

module.exports = router;