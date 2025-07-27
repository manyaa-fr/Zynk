const express = require('express');
const {
  createEvent,
  getAllEvents,
  trackEventView,
  getTrendingEvents,
  bookmarkEvent,
  filterEvents,
  toggleInterested,
  getSavedEvents
} = require('../controllers/eventController.js');
const upload = require('./cloudinary');

const router = express.Router();

router.post('/create', upload.single('image'), createEvent);
router.get('/all-events', getAllEvents)
router.get('/trending', getTrendingEvents);
router.get('/saved/:userId', getSavedEvents);
router.get('/:id', trackEventView); // Also returns event details
router.post('/:id/bookmark', bookmarkEvent);
router.post('/:id/interested', toggleInterested);
router.get('/search/filter', filterEvents);

module.exports = router;
