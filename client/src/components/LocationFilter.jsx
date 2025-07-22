import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/LocationFilter.css';

const LocationFilter = ({ onLocationSelect }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events/all-events'); // Updated to match backend route
        const allLocations = response.data.map(event => event.location);
        const uniqueLocations = [...new Set(allLocations)];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  return (
    <div className="location-filter-container">
      <label htmlFor="locationDropdown">Filter by Location:</label>
      <select
        id="locationDropdown"
        value={selectedLocation}
        onChange={handleChange}
        className="location-dropdown"
      >
        <option value="">All Locations</option>
        {locations.map((loc, index) => (
          <option key={index} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationFilter;
