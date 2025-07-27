const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getUserActivities,
  getUserCreatedEvents
} = require('../controllers/userController.js');

const router = express.Router();

// User profile routes
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', updateUserProfile);
router.get('/stats/:userId', getUserStats);
router.get('/activities/:userId', getUserActivities);
router.get('/events/:userId', getUserCreatedEvents);

module.exports = router; 