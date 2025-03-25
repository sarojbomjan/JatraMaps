// src/components/dashboard/DashboardLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (clear tokens, etc.)
    console.log('User logged out');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard min-h-screen bg-gray-50">
      {/* Dashboard Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium rounded-md hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet /> {/* This renders the nested routes */}
      </main>
    </div>
  );
}