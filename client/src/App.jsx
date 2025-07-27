import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateEvent from './pages/CreateEvent';
import OTPVerification from './components/OTPVerification';
import CategoryEvents from './pages/CategoryEvents';
import EventDetails from './pages/EventDetails';
import AboutUs from './pages/AboutUs';
import SavedEvents from './pages/SavedEvents';
import ProfilePage from './pages/ProfilePage';
import Contact from './pages/Contact';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create' element={<CreateEvent />} />
        <Route path='/OTP-verification' element={<OTPVerification />} />
        <Route path='/category/:categoryName' element={<CategoryEvents />} />
        <Route path='/event/:eventId' element={<EventDetails />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/saved' element={<SavedEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
