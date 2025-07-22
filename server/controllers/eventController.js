const Event = require('../models/events.js');

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
        const event = await Event.find().sort({ date: 1 });
        if (!event){
            return res.status(404).json({error: 'Event not found'});
        }
        res.status(200).json(event);
    } catch (error) {
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
        const {userId} = req.body;
        const event = await Event.findById(req.params.id);
        if (!event){
            return res.status(404).json({error: 'Event not found'});
        }
        if (!event.bookmarks.includes(userId)){
            event.bookmarks.push(userId);
            await event.save();
        }
        res.json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Server Error', message: error.message});
    }
}


// RSVP EVENT
const rsvpEvent = async(req, res) => {
    try {
        const {userId, status} = req.body;
        const event = await Event.findById(req.params.id);
        if (!event){
            return res.status(404).json({error: 'Event not found'});
        }
        const existing = event.rsvps.find(r => r.userId.toString() === userId);
        if (existing){
            existing.status = status;
        }
        else{
            event.rsvps.push({eventId, status});
        }
        await event.save();
        res.json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Server Error', message: error.message});
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

module.exports = {
    createEvent,
    getAllEvents,
    trackEventView,
    getTrendingEvents,
    bookmarkEvent,
    rsvpEvent,
    filterEvents
};