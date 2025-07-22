import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TrendingEvents.css'; // custom CSS file

const TrendingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('http://localhost:8080/events/trending'); // Adjust if your route is different
        const data = res.data;
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch trending events', err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="trending-section">
      <h2 className="section-title">🔥 Trending Events</h2>
      <div className="trending-grid">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event, index) => (
            <div className="trending-card" key={event._id}>
              <img src={event.imageUrl} alt={event.title} className="event-img" />
              <div className="rank-number">{index + 1}</div> 
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.location?.city || 'Location N/A'}</p>
                <p className="views">👁️ {event.viewCount}</p>
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
