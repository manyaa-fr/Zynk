import React, { useEffect, useState } from 'react';
import apiClient from '../config/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TrendingEvents.css';

const TrendingEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await apiClient.get('/events/trending');
        // If your API returns { events: [...] }, use res.data.events
        setEvents(Array.isArray(res.data) ? res.data : res.data.events || []);
      } catch (err) {
        console.error('Failed to fetch trending events', err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="trending-section">
      <h2 className="section-title">Trending Events</h2>
      <div className="trending-grid">
        {Array.isArray(events) && events.length > 0 ? (
          events.slice(0, 10).map((event, index) => (
            <div className="trending-card" key={event._id}>
              <div className="rank-number">{index + 1}</div>
              <div className="event-image-container">
                <img src={event.imageUrl} alt={event.title} className="trending-img" />
                <button
                  className="trending-view-btn"
                  onClick={e => { e.stopPropagation(); navigate(`/event/${event._id}`); }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No trending events found.</p>
        )}
      </div>
    </section>
  );
};

export default TrendingEvents;
