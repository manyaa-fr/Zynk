import '../styles/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <img className='logo' src={logo} alt="Logo" />
        <div className='search-bar-container'>
        <div className="search-bar">
          <input type="text" placeholder="Search events..." />
          <div className='divider'/>
          <button className="search-btn">Search</button>
        </div>
        </div>
        
        <nav className="nav-links">
          <a href="/create">Create Event</a>
          <a href="/about">About Us</a>
          <a href="/tickets">My Tickets</a>
        </nav>
        
        <div className="auth-buttons">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;