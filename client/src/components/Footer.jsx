import '../styles/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">EventFinder</div>
          <p>Discover the best local events in your city</p>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>EventFinder</h3>
            <a href="/about">About Us</a>
            <a href="/careers">Careers</a>
            <a href="/press">Press</a>
          </div>
          
          <div className="link-group">
            <h3>Plan Events</h3>
            <a href="/create">Create Events</a>
            <a href="/pricing">Pricing</a>
            <a href="/resources">Resources</a>
          </div>
          
          <div className="link-group">
            <h3>Support</h3>
            <a href="/help">Help Center</a>
            <a href="/community">Community</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 EventFinder. All rights reserved.</p>
        <div className="legal-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;