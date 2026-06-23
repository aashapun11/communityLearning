const Notification = require('../models/NotificationModel');

const createNotification = async (userId, type, message, relatedId = null, relatedType = null) => {
    try {
        await Notification.create({
            userId,
            type,
            message,
            relatedId,
            relatedType
        });
    } catch (err) {
        console.error('Notification error:', err.message);
        // never crash main flow because of notification failure
    }
};

module.exports = { createNotification };