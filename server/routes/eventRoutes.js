const express = require('express');
const {
  createEvent,
  getAllEvents,
  trackEventView,
  getTrendingEvents,
  bookmarkEvent,
  rsvpEvent,
  filterEvents
} = require('../controllers/eventController.js');
const upload = require('./cloudinary');

const router = express.Router();

router.post('/create', upload.single('image'), createEvent);
router.get('/all-events', getAllEvents)
router.get('/trending', getTrendingEvents);
router.get('/:id', trackEventView); // Also returns event details
router.post('/:id/bookmark', bookmarkEvent);
router.post('/:id/rsvp', rsvpEvent);
router.get('/search/filter', filterEvents);

module.exports = router;
