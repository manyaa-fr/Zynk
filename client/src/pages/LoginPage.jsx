import React, { useState } from 'react';
import '../styles/LoginPage.css';
import signupbg from '../assets/signupbg.mp4';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {

const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: name === "email" ? value.toLowerCase() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials);
      const response = await axios.post('http://localhost:8080/auth/login', credentials);
      if (response.status === 200){
        const { token } = response.data;
        localStorage.setItem("token", token);
        alert("Login Successful");
        navigate('/');
      }
    } catch (error) {
      if (error.response){
        alert(error.response.data.message || "Login failed");
      } else{
        console.log("Login error: ", error.message);
        alert("Network error. Please try again");
      }
    }
  };

  return (
    <div className="login-container">
      {/* LEFT FORM SIDE */}
      <div className="left-form-section">
        <h2>Welcome Back 👋</h2>
        <p className="login-subtext">Log in to continue discovering events on Zink</p>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login →</button>
          <p className="signup-link">
            New here? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>

      {/* RIGHT VIDEO SIDE */}
      <div className="right-video-section">
        <video autoPlay loop muted className="video-bg">
          <source src={signupbg} type="video/mp4" />
        </video>

        <div className="floating-icons">
          <span>🎪</span>
          <span>🎧</span>
          <span>🌈</span>
          <span>🎭</span>
        </div>

        <div className="video-overlay">
          <h1>Zink</h1>
          <p className="tagline">Let the vibes pull you in.</p>
          <ul>
            <li>Exclusive access to events</li>
            <li>Your personalized dashboard</li>
            <li>Fastest bookings. Ever.</li>
          </ul>
          <p className="footer-line">Already trusted by 50,000+ users.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
