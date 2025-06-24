import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">
          EventVista
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/events" className="hover:text-indigo-500 font-medium transition">Browse Events</Link>
          <Link to="/dashboard" className="hover:text-indigo-500 font-medium transition">Dashboard</Link>
          <Link to="/login" className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Sign In</Link>
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex items-center" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 space-y-2">
          <Link to="/events" className="block py-2 text-indigo-700 font-medium" onClick={() => setMenuOpen(false)}>Browse Events</Link>
          <Link to="/dashboard" className="block py-2 text-indigo-700 font-medium" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/login" className="block py-2 bg-indigo-600 text-white rounded-lg text-center font-semibold shadow hover:bg-indigo-700 transition" onClick={() => setMenuOpen(false)}>Sign In</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;