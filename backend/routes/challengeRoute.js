const express = require('express');
const router = express.Router();
const { createChallenge, updateChallenge, deleteChallenge, getChallenges, getChallengeById, getMyChallenges,
     joinChallenge, leaveChallenge, getTopicsByCategory, getChallengesCategory } = require('../controllers/challengeController');
const { createChallengeValidator, updateChallengeValidator } = require('../validators/challengeValidator');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalMiddleware');

router.post('/createChallenge', protect, createChallengeValidator, validate, createChallenge);
router.patch('/updateChallenge/:id', protect, updateChallengeValidator, validate, updateChallenge);
router.delete('/deleteChallenge/:id', protect, deleteChallenge);
router.get('/getChallenges', getChallenges);
router.get('/getChallengeById/:id', optionalAuth, getChallengeById);
router.get('/getMyChallenges', protect, getMyChallenges);
router.post('/joinChallenge/:id', protect, joinChallenge);
router.delete('/leaveChallenge/:id', protect, leaveChallenge);

// router.get('/getTopics', getTopics);
router.get('/getChallengesCategory', getChallengesCategory);
router.get("/getTopicsByCategory/:slug", getTopicsByCategory);
router.get("/getChallengesByTopic", getChallenges);

module.exports = router;