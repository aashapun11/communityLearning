const { body } = require('express-validator');

const registerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidator = [
    body('emailOrUsername')
        .notEmpty()
        .withMessage('Email or username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidator, loginValidator };