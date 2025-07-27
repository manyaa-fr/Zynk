const User = require('../models/user');
const Event = require('../models/events');

// GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

// UPDATE USER PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updateData.password;
    delete updateData.email; // Email should be updated through a separate verification process
    delete updateData.username; // Username should be updated through a separate process

    const user = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

// GET USER STATS
const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Get saved events count
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savedEventsCount = user.savedEvents.length;

    // Get created events count
    const createdEventsCount = await Event.countDocuments({ createdBy: userId });

    // Get events attended (interested events)
    const interestedEventsCount = await Event.countDocuments({ interested: userId });

    // For now, using mock data for followers/following and rating
    // These would need separate models/tables in a real application
    const stats = {
      eventsAttended: interestedEventsCount,
      eventsCreated: createdEventsCount,
      eventsSaved: savedEventsCount,
      followers: 156, // Mock data - would need a followers model
      following: 89,  // Mock data - would need a following model
      rating: 4.8     // Mock data - would need a ratings model
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

// GET USER ACTIVITIES
const getUserActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get recent activities
    const activities = [];

    // Get recent saved events
    const recentSavedEvents = await Event.find({ _id: { $in: user.savedEvents } })
      .sort({ createdAt: -1 })
      .limit(5);

    recentSavedEvents.forEach(event => {
      activities.push({
        id: event._id,
        type: 'saved',
        event: event.title,
        date: event.createdAt,
        eventId: event._id
      });
    });

    // Get recent created events
    const recentCreatedEvents = await Event.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    recentCreatedEvents.forEach(event => {
      activities.push({
        id: event._id,
        type: 'created',
        event: event.title,
        date: event.createdAt,
        eventId: event._id
      });
    });

    // Get recent interested events
    const recentInterestedEvents = await Event.find({ interested: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    recentInterestedEvents.forEach(event => {
      activities.push({
        id: event._id,
        type: 'attended',
        event: event.title,
        date: event.createdAt,
        eventId: event._id
      });
    });

    // Sort all activities by date and take the most recent 10
    const sortedActivities = activities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    res.json(sortedActivities);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

// GET USER CREATED EVENTS
const getUserCreatedEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const events = await Event.find({ createdBy: userId })
      .sort({ date: -1 });

    // Transform events to include attendee count and status
    const transformedEvents = events.map(event => ({
      id: event._id,
      title: event.title,
      date: event.date,
      attendees: event.interested ? event.interested.length : 0,
      status: new Date(event.date) >= new Date() ? 'upcoming' : 'completed',
      eventId: event._id
    }));

    res.json(transformedEvents);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getUserActivities,
  getUserCreatedEvents
}; 