const { body } = require('express-validator');

const createCheckInValidator = [
    body('challengeId')
        .notEmpty()
        .withMessage('Challenge ID is required'),
    body('note')
        .notEmpty()
        .withMessage('Note is required')
        .isLength({ max: 500 })
        .withMessage('Note cannot exceed 500 characters'),
];

module.exports = { createCheckInValidator };