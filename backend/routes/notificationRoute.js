const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getUserNotifications, markAllAsRead, markAsRead } = require('../controllers/notificationController');

router.get('/', protect, getUserNotifications);
router.patch('/readAllNotification', protect, markAllAsRead);
router.patch('/readNotification/:id', protect, markAsRead);

module.exports = router;