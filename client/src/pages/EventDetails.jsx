import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import '../styles/LocationFilter.css';
import '../styles/EventDetails.css';
import API_BASE_URL from '../config/api';

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

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [interestedLoading, setInterestedLoading] = useState(false);
  const [interested, setInterested] = useState(false);
  const [interestedCount, setInterestedCount] = useState(0);

  const userId = getUserId();
  console.log('Current userId:', userId);

  const isSaved = Array.isArray(event?.bookmarks) ? event.bookmarks.includes(userId) : false;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
        if (response.data?.success && response.data.message) {
          setEvent(response.data.message);
          // Interested logic
          const interestedUsers = response.data.message.interested || [];
          setInterestedCount(interestedUsers.length);
          setInterested(interestedUsers.includes(userId));
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const refetchEvent = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/events/${eventId}`);
      if (res.data?.success && res.data.message) {
        setEvent(res.data.message);
        // Interested logic
        const interestedUsers = res.data.message.interested || [];
        setInterestedCount(interestedUsers.length);
        setInterested(interestedUsers.includes(userId));
      }
    } catch {}
  };

  const handleSave = async () => {
    if (!userId) return alert('Please log in to save events.');

    setSaveLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/events/${eventId}/bookmark`, { userId });
      refetchEvent();
    } catch (error) {
      alert('Failed to save event.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleInterested = async () => {
    if (!userId) return alert('Please log in to mark as interested.');
    setInterestedLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/events/${eventId}/interested`, { userId });
      await refetchEvent();
    } catch (error) {
      alert('Failed to update interest.');
    } finally {
      setInterestedLoading(false);
    }
  };

  if (loading) return <div className="location-filter-container">Loading...</div>;
  if (!event) return <div className="location-filter-container">Event not found.</div>;

  return (
    <div className="event-details-container" style={{ position: 'relative' }}>
      <div className="save-icon-top-right" onClick={handleSave} title="Save Event">
        {isSaved ? <BsBookmarkFill size={26} color="#8e44ad" /> : <BsBookmark size={26} />}
      </div>
      <h2 className="event-title">{event.title}</h2>

      <div className="event-image-wrapper">
        <div className="event-image-container">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.title} className="event-image" />
          ) : (
            <div className="event-no-image">No Image</div>
          )}
        </div>
      </div>

      <div className="event-meta">
        <p><strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Location:</strong> {event.address?.city}, {event.address?.state}, {event.address?.country}</p>
        <p><strong>Category:</strong> {event.category}</p>
      </div>

      <div className="event-description-wrapper">
        <p className="event-description"><strong>Description:</strong></p>
        <pre className="event-description-text">{event.description}</pre>
      </div>

      <div className="event-rsvp">
        <button
          className={`rsvp-button${interested ? ' selected' : ''}`}
          onClick={handleInterested}
          disabled={interestedLoading}
        >
          {interested ? 'Remove Interested' : interestedLoading ? 'Updating...' : 'Interested'}
        </button>
        <span className="rsvp-count">Interested: {interestedCount}</span>
      </div>
    </div>
  );
};

export default EventDetails;