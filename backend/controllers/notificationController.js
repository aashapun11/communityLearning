const Notification = require('../models/NotificationModel');
const AppError = require('../utils/AppError');

const getUserNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        next(new AppError('Failed to fetch notifications', 500));
    }
};

// mark single as read
const markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);
        
        if (!notification) {
            return next(new AppError("Notification not found", 404));
        }

        if (notification.userId.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized", 403));
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: "Notification marked as read" });

    } catch (err) {
        next(err);
    }
};

// mark all as read
const markAllAsRead = async (req, res, next) => {
    try {
        await Notification.updateMany(
            { userId: req.user._id, isRead: false },
            { isRead: true }
        );

        res.status(200).json({ message: "All notifications marked as read" });

    } catch (err) {
        next(err);
    }
};

module.exports = {getUserNotifications, markAsRead, markAllAsRead };