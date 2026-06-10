const express = require('express');
const router = express.Router();
const { createChallenge, updateChallenge, deleteChallenge, getChallenges, getChallengeById, joinChallenge, leaveChallenge } = require('../controllers/challengeController');
const { createChallengeValidator, updateChallengeValidator } = require('../validators/challengeValidator');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');

router.post('/createChallenge', protect, createChallengeValidator, validate, createChallenge);
router.patch('/updateChallenge/:id', protect, updateChallengeValidator, validate, updateChallenge);
router.delete('/deleteChallenge/:id', protect, deleteChallenge);
router.get('/getChallenges', protect, getChallenges);
router.get('/getChallengeById/:id', protect, getChallengeById);
router.post('/joinChallenge/:id', protect, joinChallenge);
router.delete('/leaveChallenge/:id', protect, leaveChallenge);

module.exports = router;