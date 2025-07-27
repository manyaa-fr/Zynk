import '../styles/Header.css';
import logo from '../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/');
  //   window.location.reload(); // Ensures UI updates immediately
  // };
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
          <Link to="/create">Create Event</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/saved">Saved Events</Link>
        </nav>
        
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <button className="signup-btn" onClick={() => navigate('/profile')}>Profile</button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={()=>{navigate('/login')}}>Log In</button>
              <button className="signup-btn" onClick={()=>{navigate('/signup')}}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;