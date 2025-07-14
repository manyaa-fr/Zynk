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

const router = express.Router();

router.post('/create', createEvent);
router.get('/all-events', getAllEvents)
router.get('/trending', getTrendingEvents);
router.get('/:id', trackEventView); // Also returns event details
router.post('/:id/bookmark', bookmarkEvent);
router.post('/:id/rsvp', rsvpEvent);
router.get('/search/filter', filterEvents);

module.exports = router;
