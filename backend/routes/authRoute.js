const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validate = require('../middleware/validate');

router.post('/register', registerValidator, validate, authController.registerUser);
router.post('/login', loginValidator, validate, authController.loginUser);

// protected routes
router.get('/profile', protect, authController.getProfile);

module.exports = router;