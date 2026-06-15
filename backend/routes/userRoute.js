const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');

router.get('userProfile/:username', getUserProfile); // public

module.exports = router;