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

const editCheckInValidator = [
    body('note')
        .optional()
        .notEmpty()
        .withMessage('Note cannot be empty')
        .isLength({ max: 500 })
        .withMessage('Note cannot exceed 500 characters'),
];

module.exports = { createCheckInValidator, editCheckInValidator };

