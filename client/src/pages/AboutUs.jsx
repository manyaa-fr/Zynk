import React from 'react';
import '../styles/AboutUs.css';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <section className="hero">
        <h1>About Zynk</h1>
        <p>Zynk is where the real world comes alive.</p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>To help people explore the world around them through <strong>experiences, not just screens</strong>.</p>
      </section>

      <section className="features">
        <h2>What You Can Do on Zynk</h2>
        <ul>
          <li>🌍 <strong>Browse</strong> local and global events by vibe, category, or time.</li>
          <li>🎟️ <strong>Host</strong> your own events and get discovered.</li>
          <li>🔥 <strong>Boost</strong> your event’s visibility with aesthetic listings.</li>
          <li>💬 <strong>Connect</strong> with attendees and build your community.</li>
        </ul>
      </section>

      <section className="community">
        <h2>For Communities, By Communities</h2>
        <p>
          Zynk is powered by a growing network of <strong>creators, students, artists, musicians, and local legends</strong>.
          We're here to help you put your scene on the map — one amazing event at a time.
        </p>
      </section>

      <section className="cta">
        <h2>Join the Movement</h2>
        <p>
          From <strong>college campuses to creative hubs</strong>, we’re building the future of social discovery —
          a place where events don’t just fill your calendar, they shape your story.
        </p>
        <h3>So go on — <br /> <span className="tagline">Browse. Host. Zynk.</span></h3>
        <button type="submit" className="contact-btn" onClick={()=>{navigate('/contact')}}>Contact Us? →</button>
      </section>
    </div>
  );
};

export default AboutUs;