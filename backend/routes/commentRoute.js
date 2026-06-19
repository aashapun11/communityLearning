const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment, toggleCommentUpvote } = require('../controllers/commentController');
const protect = require('../middleware/authMiddleware');

router.post('/addComment', protect, addComment);
router.get('/getComments', getComments); // public
router.delete('/deleteComment/:id', protect, deleteComment);
router.post('/upvoteComment/:id', protect, toggleCommentUpvote);

module.exports = router;