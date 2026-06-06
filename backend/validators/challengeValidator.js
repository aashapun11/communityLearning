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

module.exports = { createChallengeValidator };