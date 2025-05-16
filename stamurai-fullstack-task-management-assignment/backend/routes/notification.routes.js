const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const notificationControllers = require("../controllers/notification.controllers")

router.get('/', protect, notificationControllers.getUsersNotifications);
router.put('/:id/read', protect, notificationControllers.markNotificationAsRead);
router.put('/read-all', protect, notificationControllers.markAllNotificationsAsRead);

module.exports = router;