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
          <div key={index} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>

      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;