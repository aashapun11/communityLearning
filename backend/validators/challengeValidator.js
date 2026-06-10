const { body } = require('express-validator');

const createChallengeValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('topic').notEmpty().withMessage('Topic is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('difficulty')
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Invalid difficulty'),
    body('duration')
        .isInt({ min: 1 })
        .withMessage('Duration must be at least 1 day'),
    body('startDate')
        .isDate()
        .withMessage('Valid start date is required'),
];

const updateChallengeValidator = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('topic').optional().notEmpty().withMessage('Topic cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('difficulty').optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Invalid difficulty'),
    body('duration').optional()
        .isInt({ min: 1 })
        .withMessage('Duration must be at least 1 day'),
    body('startDate').optional()
        .isDate()
        .withMessage('Valid start date is required'),
];

module.exports = { createChallengeValidator, updateChallengeValidator };