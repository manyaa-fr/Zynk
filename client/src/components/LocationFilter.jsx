import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LocationFilter.css';
import axios from 'axios'; // Added axios import

const LocationFilter = ({ onLocationSelect, location, category, setLocation, setCategory, categories }) => {
  const [search, setSearch] = useState(location || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Extract unique country, state, city values from event.address
  const getUniqueAddresses = () => {
    const addressSet = new Set();
    events.forEach(event => {
      if (event.address) {
        if (event.address.country && event.address.country.trim()) addressSet.add(event.address.country.trim());
        if (event.address.state && event.address.state.trim()) addressSet.add(event.address.state.trim());
        if (event.address.city && event.address.city.trim()) addressSet.add(event.address.city.trim());
      }
    });
    return Array.from(addressSet);
  };

  useEffect(() => {
    axios.get('/events/all-events')
      .then(response => {
        setEvents(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setEvents([]);
      });
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const uniqueAddresses = getUniqueAddresses();
    const filtered = uniqueAddresses.filter(addr =>
      addr.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered);
    setShowDropdown(filtered.length > 0);
  }, [search, events]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowDropdown(false);
    if (setLocation) setLocation(suggestion);
    if (onLocationSelect) onLocationSelect(suggestion);
  };

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter events by location and category
  const filteredEvents = Array.isArray(events) ? events.filter(event => {
    let matchesLocation = true;
    let matchesCategory = true;
    if (location) {
      matchesLocation = [event.address?.country, event.address?.state, event.address?.city]
        .some(val => val && val.toLowerCase().includes(location.toLowerCase()));
    }
    if (category) {
      matchesCategory = event.category === category;
    }
    return matchesLocation && matchesCategory;
  }) : [];

  return (
    <div className="location-filter-container">
      <label htmlFor="location-search" className="location-label">
        Browse events by location...
      </label>
      <div style={{ position: 'relative', width: '100%', maxWidth: 400 }} ref={inputRef}>
        <input
          id="location-search"
          type="text"
          className="location-dropdown"
          placeholder="Enter Location"
          value={search}
          onChange={handleInputChange}
          autoComplete="off"
          onFocus={() => setShowDropdown(suggestions.length > 0)}
        />
        {showDropdown && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            color: '#222',
            zIndex: 10,
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            maxHeight: 200,
            overflowY: 'auto',
          }}>
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                style={{ padding: '10px', cursor: 'pointer' }}
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Category tags */}
      <div style={{ margin: '2rem 0 1rem 0', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {[{ name: 'All' }, ...(categories || [])].map((cat, idx) => {
          const catName = cat.name || cat;
          const isSelected = (category === catName) || (!category && catName === 'All');
          return (
            <button
              key={catName}
              style={{
                background: isSelected ? '#e6f0ff' : 'transparent',
                color: isSelected ? '#2563eb' : '#444',
                border: 'none',
                borderBottom: isSelected ? '2px solid #2563eb' : '2px solid transparent',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                padding: '0.5rem 0.8rem',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onClick={() => {
                if (catName === 'All') {
                  setCategory('');
                } else if (category === catName) {
                  setCategory('');
                } else {
                  setCategory(catName);
                }
              }}
            >
              {catName}
            </button>
          );
        })}
      </div>
      {/* Event panel */}
      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <div style={{ color: '#888', fontSize: 18, marginTop: 40 }}>No events found.</div>
        ) : (
          filteredEvents.map((event, idx) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default LocationFilter;
