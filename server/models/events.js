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
  imageUrl: String, // URL of the event image

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who created the event

  viewCount: { type: Number, default: 0 }, // simpler than array of timestamps
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // who bookmarked
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // who is interested

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);