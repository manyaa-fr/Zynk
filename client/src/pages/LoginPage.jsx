import React, { useState } from 'react';
import '../styles/LoginPage.css';
import signupbg from '../assets/signupbg.mp4';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpInput from '../components/OtpInput';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: name === "email" ? value.toLowerCase() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', credentials);
      if (response.status === 200){
        const { token, message } = response.data;
        localStorage.setItem("token", token);
        if (message && message._id) {
          localStorage.setItem('user', JSON.stringify({ userId: message._id, username: message.username, email: message.email }));
        }
        alert("Login Successful");
        navigate('/dashboard');
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

  // OTP Login Handlers
  const handleSendOtp = async () => {
    setOtpError('');
    try {
      const res = await axios.post('http://localhost:8080/auth/login-otp-request', { email: otpEmail });
      if (res.data.success) {
        setOtpSent(true);
      } else {
        setOtpError(res.data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  // Helper to decode JWT and get userId
  function getUserIdFromToken(token) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id || null;
    } catch {
      return null;
    }
  }

  const handleOtpVerify = async (enteredOtp) => {
    setOtpError('');
    try {
      const res = await axios.post('http://localhost:8080/auth/login-otp-verify', { email: otpEmail, otp: enteredOtp });
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        // Decode userId from token
        const userId = getUserIdFromToken(res.data.token);
        if (userId) {
          localStorage.setItem('user', JSON.stringify({ userId }));
        }
        alert('Login Successful');
        navigate('/');
      } else {
        setOtpError(res.data.error || 'Invalid OTP');
      }
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Invalid OTP');
    }
  };

  return (
    <div className="login-container">
      {/* LEFT FORM SIDE */}
      <div className="left-form-section">
        <h2>Welcome Back 👋</h2>
        <p className="login-subtext">Log in to continue discovering events on Zink</p>
        {!showOtpLogin ? (
          <>
            <form onSubmit={handleSubmit}>
              <input
                name="username"
                type="text"
                placeholder="Username"
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
            <button className="otp-login-btn" style={{ marginTop: 16 }} onClick={() => setShowOtpLogin(true)}>
              Login with OTP
            </button>
          </>
        ) : (
          <div className="otp-login-section">
            {!otpSent ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={otpEmail}
                  onChange={e => setOtpEmail(e.target.value)}
                  required
                  style={{ marginBottom: 8, width: '100%' }}
                />
                <button onClick={handleSendOtp} style={{ width: '100%' }}>Send OTP</button>
                <button onClick={() => setShowOtpLogin(false)} style={{ width: '100%', marginTop: 8 }}>Back to Password Login</button>
                {otpError && <div className="error" style={{ marginTop: 8 }}>{otpError}</div>}
              </>
            ) : (
              <>
                <p>OTP sent to {otpEmail}</p>
                <OtpInput length={4} onOtpSubmit={handleOtpVerify} />
                <button onClick={() => { setOtpSent(false); setOtpEmail(''); }} style={{ width: '100%', marginTop: 8 }}>Resend/Change Email</button>
                {otpError && <div className="error" style={{ marginTop: 8 }}>{otpError}</div>}
              </>
            )}
          </div>
        )}
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
