const Event = require('../models/events.js');
const User = require('../models/user');

// CREATE EVENT
const createEvent = async(req, res) => {
    try {
        const eventData = req.body;
        if (req.file && req.file.path) {
            eventData.imageUrl = req.file.path;
        }
        const event = new Event(eventData);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({error: 'Server Error', message: error.message});
    }
}

// GET ALL EVENTS
const getAllEvents = async(req, res) => {
    try {
        console.log('Fetching all events...');
        const events = await Event.find().sort({ date: 1 });
        console.log('Found events:', events.length);
        res.status(200).json(events);
    } catch (error) {
        console.error('Error in getAllEvents:', error);
        res.status(500).json({error: 'Server Error', message: error.message});
    }
}

// VIEW TRACKING
const trackEventView = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event){
            return res.status(404).json({error: 'Event not found'});
        }
        event.viewCount += 1;
        await event.save();
        res.json({success: true, message: event});
    } catch (error) {
        res.status(500).json({error: 'Server Error', message: error.message});
    }
}

// TOP 10 TRENDING EVENTS
const getTrendingEvents = async(req, res) => {
    try {
        const trendingEvents = await Event.find().sort({viewCount: -1}).limit(10);
        res.json(trendingEvents);
    } catch (error) {
        res.status(500).json({error: 'Server Error', message: error.message});
    }
}

// BOOKMARK EVENTS
const bookmarkEvent = async(req, res) => {
    try {
        const { userId } = req.body;
        const event = await Event.findById(req.params.id);
        const user = await User.findById(userId);
    
        if (!event || !user) return res.status(404).json({ error: 'Event or User not found' });
    
        const alreadySaved = user.savedEvents.includes(event._id);
    
        if (alreadySaved) {
          user.savedEvents = user.savedEvents.filter(id => id.toString() !== event._id.toString());
          event.bookmarks = event.bookmarks.filter(id => id.toString() !== userId);
        } else {
          user.savedEvents.push(event._id);
          event.bookmarks.push(userId);
        }
    
        await user.save();
        await event.save();
    
        res.json({ success: true, saved: !alreadySaved });
      } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
      }
}


// FILTER EVENTS
const filterEvents = async(req, res) => {
    try {
        const {location, category, dateRange} = req.body;
        const query = {};

        if (location){
            const { country, state, city} = location;
            query.$or = [];
            if (country) query.$or.push({ 'location.country': { $regex: country, $options: 'i' } });
            if (state)   query.$or.push({ 'location.state': { $regex: state, $options: 'i' } });
            if (city)    query.$or.push({ 'location.city': { $regex: city, $options: 'i' } });
        }

        if (category){
            query.category = category;
        }

        if (dateRange === 'today') {
            const start = new Date();
            start.setHours(0, 0, 0, 0);
          
            const end = new Date();
            end.setHours(23, 59, 59, 999);
          
            query.date = { $gte: start, $lte: end };
          }
          
          else if (dateRange === 'weekend') {
            const now = new Date();
            const daysUntilSaturday = (6 - now.getDay() + 7) % 7;
            
            const saturday = new Date(now);
            saturday.setDate(now.getDate() + daysUntilSaturday);
            saturday.setHours(0, 0, 0, 0);
          
            const sunday = new Date(saturday);
            sunday.setDate(saturday.getDate() + 1);
            sunday.setHours(23, 59, 59, 999);
          
            query.date = { $gte: saturday, $lte: sunday };
          }

          else if (dateRange === 'tomorrow'){
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const tomorrowEnd = new Date(tomorrow);
            tomorrowEnd.setHours(23, 59, 59, 999);

            query.date = { $gte: tomorrow, $lte: tomorrowEnd };

          }

        const events = await Event.find(query).sort({ date: 1 });
        res.json(events);

    } catch (error) {
        res.status(500).json({error: 'Server Error', message: error.message});
    }
}

// TOGGLE INTERESTED
const toggleInterested = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    const idx = event.interested.findIndex(id => id.toString() === userId);
    if (idx > -1) {
      // Remove user if already interested
      event.interested.splice(idx, 1);
    } else {
      // Add user if not interested
      event.interested.push(userId);
    }
    await event.save();
    res.json({ success: true, message: event });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

// GET SAVED EVENTS FOR USER
const getSavedEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('savedEvents');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the saved events with full event details
    const savedEvents = await Event.find({ _id: { $in: user.savedEvents } })
      .sort({ date: 1 });

    res.json(savedEvents);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

module.exports = {
    createEvent,
    getAllEvents,
    trackEventView,
    getTrendingEvents,
    bookmarkEvent,
    filterEvents,
    toggleInterested,
    getSavedEvents
};