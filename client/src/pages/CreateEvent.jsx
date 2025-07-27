// components/CreateEvent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateEvent.css'; 
import createEventBg from '../assets/create-event-form.mp4';
import { useNavigate } from 'react-router-dom';


const categories = [
  'Music', 'Nightlife', 'Performing & Visual', 'Holidays', 'Dating',
  'Hobbies', 'Business', 'Food & Drink', 'Sports', 'Education', 'Health & Wellness',
  'Family & Education', 'Community', 'Charity & Causes', 'Fashion & Beauty',
  'Technology', 'Travel & Outdoor', 'Arts & Crafts', 'Gaming', 'Hospitality', 'Other '
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [form, setForm] = useState({
    title: '',
    description: '',
    country: '',
    state: '',
    city: '',
    category: '',
    date: '',
  });
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (['country', 'state', 'city'].includes(key)) return;
        formData.append(key, value);
      });
      formData.append('address[country]', form.country);
      formData.append('address[state]', form.state);
      formData.append('address[city]', form.city);
      if (image) formData.append('image', image);
              await axios.post('/events/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setSuccess(true);
      setForm({
        title: '',
        description: '',
        country: '',
        state: '',
        city: '',
        category: '',
        date: '',
      });
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating event');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in-message">
        <h2>You must be logged in to create an event.</h2>
        <button className="login-btn" onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="create-event-container">
      <div className="video-background-wrapper">
      <video autoPlay muted loop className="background-video">
        <source src={createEventBg} type="video/mp4" />
      </video>
      </div>
      
      <h2 className='heading'>Create Event</h2>
      <form className="event-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" required />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="image" type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Create Event</button>
      </form>

      {success && <div className="success">🎉 Event created successfully!</div>}
      {error && <div className="error">⚠️ {error}</div>}
    </div>
  );
};

export default CreateEvent;
