import Header from '../components/Header';
import Footer from '../components/Footer';
import eventvid from '../assets/event-vid.mp4';
import '../styles/LandingPage.css';
import { PiDiscoBallLight } from 'react-icons/pi';
import { PiMusicNotesLight } from 'react-icons/pi';
import { PiPaletteLight } from 'react-icons/pi';
import { PiCalendarStarDuotone } from 'react-icons/pi';
import { BsSuitHeart } from 'react-icons/bs';
import { TbDeviceGamepad2 } from 'react-icons/tb';
import { LuBriefcaseBusiness } from 'react-icons/lu';
import { IoFastFoodOutline } from 'react-icons/io5';
import TrendingEvents from '../components/TrendingEvents';
import LocationFilter from '../components/LocationFilter';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const categories = [
  { name: 'Music', icon: <PiMusicNotesLight /> },
  { name: 'Nightlife', icon: <PiDiscoBallLight /> },
  { name: 'Performing & Visual', icon: <PiPaletteLight /> },
  { name: 'Holidays', icon: <PiCalendarStarDuotone /> },
  { name: 'Dating', icon: <BsSuitHeart /> },
  { name: 'Hobbies', icon: <TbDeviceGamepad2 /> },
  { name: 'Business', icon: <LuBriefcaseBusiness /> },
  { name: 'Food & Drink', icon: <IoFastFoodOutline /> },
];

const LandingPage = () => {

  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/all-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Filter events when location is selected
  useEffect(() => {
    if (!location) {
      // setFilteredEvents(events); // This line is removed as per the edit hint
    } else {
      // setFilteredEvents( // This line is removed as per the edit hint
      //   events.filter(event =>
      //     event.location && event.location.toLowerCase().includes(location.toLowerCase())
      //   )
      // );
    }
  }, [location, events]);


  return (
    <div className="landing-page">
      <Header />
      <main>
      <div className="hero-wrapper">
      <video className="background-video" autoPlay muted loop playsInline>
        <source src={eventvid} type="video/mp4" />
      </video>

      <div className="hero-content">
        <div className='label'>GET INTO IT</div>
        <div className="heading-block">
        <span className="highlight-line">FROM SPICY BITES</span>
        </div>
        
        <div className="heading-block">
          <span className="highlight-line">TO SUGAR HIGHS</span>
        </div>
        <button className="cta-btn">Get Into Culinary Crawls</button>
      </div>
    </div>

    <div className="categories-nav-container">
      <div className="categories-nav">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/category/${encodeURIComponent(category.name)}`)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
    <TrendingEvents />

    <div>
      <LocationFilter
        events={events}
        onLocationSelect={setLocation}
        location={location}
        category={category}
        setLocation={setLocation}
        setCategory={setCategory}
        categories={categories}
      />
      {/* Display your events here */}
      {/* The event card rendering has been moved to LocationFilter */}
    </div>

      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;