import React, { useState, useEffect } from 'react';
import '../styles/SignupPage.css';
import signupbg from '../assets/signupbg.mp4';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categoryOptions = [
  'music', 'sports', 'arts', 'food', 'technology',
  'business', 'social', 'fashion', 'cars',
  'concert', 'standups', 'magic', 'education', 'other'
];

const SignupPage = () => {
  // Removed sendOtpToEmail
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('signupForm');
    return saved ? JSON.parse(saved) : {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      state: '',
      city: '',
      categories: [],
      notificationRadius: 100,
    };
  });

  useEffect(() => {
    localStorage.setItem('signupForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updated = [...formData.categories];
      if (checked) updated.push(value);
      else updated.splice(updated.indexOf(value), 1);
      setFormData({ ...formData, categories: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", formData);
      if (response.data.success) {
        alert("OTP sent to your email!");
        localStorage.removeItem('signupForm');
        navigate("/OTP-verification", { state: { email: formData.email } });
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };
  

  

  return (
    <div className="signup-container">
      {/* LEFT SIDE */}
      <div className="left-video-section">
        <video autoPlay loop muted className="video-bg">
          <source src={signupbg} type="video/mp4" />
        </video>
        <div className="floating-icons">
    <span>🎉</span>
    <span>🎤</span>
    <span>🍔</span>
    <span>🎨</span>
  </div>

        <div className="video-overlay">
          <h1>Zink</h1>
          <p className="tagline">Sync with the city.</p>
          <ul>
            <li>Discover your favourite events</li>
            <li>Create your own event</li>
            <li>Book tickets</li>
          </ul>
          <p className="footer-line">Join thousands of people discovering events</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-form-section">
        <h2>Join Zink</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-grid">
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
            <input name="country" placeholder="Country" onChange={handleChange} />
            <input name="state" placeholder="State" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
          </div>

          <label className="prefs-label">Preferences:</label>
          <div className="checkboxes">
            {categoryOptions.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleChange}
                />
                {cat}
              </label>
            ))}
          </div>

          <button type="submit">Create Account →</button>

          <p className="login">
          Already have an account?  <a href="/login">Sign in here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
