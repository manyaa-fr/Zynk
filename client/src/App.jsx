import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingPage from './pages/LandingPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import OTPVerification from './components/OTPVerification.jsx';
import CategoryEvents from './pages/CategoryEvents.jsx';
import EventDetails from './pages/EventDetails.jsx';
import AboutUs from './pages/AboutUs.jsx';

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
      </Routes>
    </Router>
  );
}

export default App;
