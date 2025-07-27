const express = require('express');
const { sendContactEmail } = require('../controllers/contactController.js');

const router = express.Router();

// Debug route to test contact routes
router.get('/test', (req, res) => {
  res.json({ message: 'Contact routes are working!' });
});

// Contact form submission
router.post('/submit', sendContactEmail);

module.exports = router; 