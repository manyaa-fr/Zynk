import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">EventVista</h1>
          <p className="mt-2 text-gray-600">Your events, simplified.</p>
        </div>
        <Outlet /> {/* Login/Signup forms render here */}
      </div>
    </div>
  );
};

export default AuthLayout;