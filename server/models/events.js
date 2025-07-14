const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  address: {
    country: String,
    state: String,
    city: String
  },
  category: String, // e.g., "Music", "Tech"
  date: Date,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who created the event

  viewCount: { type: Number, default: 0 }, // simpler than array of timestamps
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // who bookmarked
  rsvps: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['yes', 'interested'], default: 'yes' }
  }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);