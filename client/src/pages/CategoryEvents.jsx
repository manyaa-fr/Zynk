import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LocationFilter.css';
import API_BASE_URL from '../config/api';

const CategoryEvents = () => {
  const { categoryName } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/events/all-events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => event.category === categoryName);

  return (
    <div className="location-filter-container">
      <h2 style={{ marginBottom: 24 }}>Events in "{categoryName}"</h2>
      {loading ? (
        <div>Loading...</div>
      ) : filteredEvents.length === 0 ? (
        <div style={{ color: '#888', fontSize: 18, marginTop: 40 }}>No events found in this category.</div>
      ) : (
        <div className="event-list">
          {filteredEvents.map((event, idx) => (
            <div
              key={idx}
              className="event-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/event/${event._id}`)}
            >
              <div style={{ width: '100%', height: 180, marginBottom: 16, background: '#eee', borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ color: '#bbb', fontSize: 24 }}>No Image</div>
                )}
              </div>
              <h3>{event.title}</h3>
              <p>{event.address?.city}, {event.address?.state}, {event.address?.country}</p>
              <p>{event.date ? new Date(event.date).toLocaleDateString() : ''}</p>
              <p>{event.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryEvents; 