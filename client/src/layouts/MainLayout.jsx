import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet /> {/* This renders child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;