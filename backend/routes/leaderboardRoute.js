const express = require('express');
const router = express.Router();
const { getChallengeLeaderboard, getMonthlyLeaderboard, getAllTimeLeaderboard, getMostActiveChallenges } = require('../controllers/leaderboardController');

router.get('/alltime', getAllTimeLeaderboard);
router.get('/monthly', getMonthlyLeaderboard);
router.get('/challenge/:challengeId', getChallengeLeaderboard); // public
router.get('/mostActive', getMostActiveChallenges);

module.exports = router