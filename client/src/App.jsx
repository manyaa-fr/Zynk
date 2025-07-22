import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingPage from './pages/LandingPage.jsx';
import SignupPage from './pages/signupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import OTPVerification from './components/OTPVerification.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create' element={<CreateEvent />} />
        <Route path='/OTP-verification' element={<OTPVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
