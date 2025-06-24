import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

// Dashboard
import Dashboard from './pages/Dashboard';
import MyEvents from './pages/Dashboard/MyEvents';
import MyTickets from './pages/Dashboard/MyTickets';
import Analytics from './pages/Dashboard/Analytics';

// Auth
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Simple 404 Page (minimal implementation)
const NotFound = () => <div className="text-center py-20">404 | Page Not Found</div>;

function App() {
  return (
    <Router>
      {/* Skip AuthProvider if not implementing auth yet */}
      <AuthProvider>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="checkout" element={<Checkout />} />
            
            {/* Dashboard Nested Routes */}
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="my-events" replace />} />
              <Route path="my-events" element={<MyEvents />} />
              <Route path="my-tickets" element={<MyTickets />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Route>

          {/* Auth Layout Routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Standalone Pages */}
          <Route path="/confirmation" element={<Confirmation />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;