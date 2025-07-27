import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Clock, Filter, Search, Grid, List, Bookmark } from 'lucide-react';
import axios from 'axios';
import '../styles/SavedEvents.css';

// Function to get current user ID (similar to EventDetails.jsx)
function getUserId() {
  // Try to decode from token first
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id || payload._id) {
        return payload.id || payload._id;
      }
    } catch (e) {
      // ignore
    }
  }
  // Fallback to user object in localStorage
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.userId) return user.userId;
  } catch {}
  return null;
}

const SavedEventsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = getUserId();

  useEffect(() => {
    const fetchSavedEvents = async () => {
      if (!userId) {
        setError('Please log in to view saved events');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/events/saved/${userId}`);
        setSavedEvents(response.data);
      } catch (error) {
        console.error('Error fetching saved events:', error);
        setError('Failed to load saved events');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedEvents();
  }, [userId]);

  const categories = ['all', 'Music', 'Food & Drink', 'Business', 'Performing & Visual', 'Hobbies'];

  const filteredEvents = savedEvents.filter(event => {
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.address?.city && event.address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (event.address?.state && event.address.state.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  const EventCard = ({ event, isPast = false }) => (
    <div className={`event-card ${viewMode} ${isPast ? 'past-event' : ''}`}>
      <div className="event-image">
        <img src={event.imageUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"} alt={event.title} />
        <div className="bookmark-icon">
          <Bookmark fill="#ff6b4a" color="#ff6b4a" size={20} />
        </div>
        {isPast && <div className="past-overlay">Past Event</div>}
      </div>
      
      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-price">Free</span>
        </div>
        
        <div className="event-details">
          <div className="detail-item">
            <Calendar size={16} />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="detail-item">
            <Clock size={16} />
            <span>{new Date(event.date).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
          
          <div className="detail-item">
            <MapPin size={16} />
            <span>{event.address?.city}, {event.address?.state}</span>
          </div>
        </div>
        
        <div className="event-footer">
          <span className="category-tag">{event.category}</span>
          <span className="saved-date">
            Saved {new Date(event.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="event-actions">
          <button className="btn-primary">View Details</button>
          <button className="btn-secondary">Remove</button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="saved-events-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your saved events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-events-page">
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-events-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1>My Saved Events</h1>
            <p>Your personal collection of amazing experiences</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{savedEvents.length}</span>
              <span className="stat-label">Total Saved</span>
            </div>
            <div className="stat">
              <span className="stat-number">{upcomingEvents.length}</span>
              <span className="stat-label">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-filter-container">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search your saved events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-container">
            <Filter size={20} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={20} />
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Events Content */}
      <div className="events-content">
        {upcomingEvents.length > 0 && (
          <section className="events-section">
            <div className="section-header">
              <h2>Upcoming Events</h2>
              <span className="event-count">{upcomingEvents.length} events</span>
            </div>
            <div className={`events-grid ${viewMode}`}>
              {upcomingEvents.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section className="events-section">
            <div className="section-header">
              <h2>Past Events</h2>
              <span className="event-count">{pastEvents.length} events</span>
            </div>
            <div className={`events-grid ${viewMode}`}>
              {pastEvents.map(event => (
                <EventCard key={event._id} event={event} isPast={true} />
              ))}
            </div>
          </section>
        )}

        {filteredEvents.length === 0 && savedEvents.length > 0 && (
          <div className="empty-state">
            <Bookmark size={64} color="#ccc" />
            <h3>No saved events found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="btn-primary">Browse Events</button>
          </div>
        )}

        {savedEvents.length === 0 && !loading && !error && (
          <div className="empty-state">
            <Bookmark size={64} color="#ccc" />
            <h3>No saved events yet</h3>
            <p>Start saving events to see them here</p>
            <button className="btn-primary">Browse Events</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedEventsPage;