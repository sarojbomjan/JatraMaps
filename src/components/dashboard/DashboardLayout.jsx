import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, User, Bell } from 'lucide-react';
import { Link } from "react-router-dom";
import Wheel from "../../assets/Wheel.png";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here (clear tokens, etc.)
    console.log('User logged out');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard min-h-screen bg-gray-50">
      {/* Dashboard Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <img src={Wheel} alt="Logo" width={100} height={90} />
            <div className="flex-shrink-0 flex items-center">
              <a href="" className="text-xl md:text-2xl font-bold text-orange-600">
                JatraMaps
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md">
                Dashboard
              </a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md">
                My Events
              </a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md">
                Saved Events
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center justify-between space-x-2">
              {/* Notification Icon */}
              <button className='p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer'>
                <Bell className='h-6 w-6'/>
              </button>

              {/* Profile Icon */}
              <button className='p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer'>
                <User className='h-6 w-6'/>
              </button>

              {/* Logout Button */}
              <button onClick={handleLogout} className="hidden md:block px-4 py-2 bg-white-100 text-black font-medium hover:bg-orange-600 hover:text-white rounded-md cursor-pointer">
                Logout
              </button>
             
              {/* Hamburger Icon for Mobile */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className='mobile-menu fixed inset-0 bg-white bg-opacity-90'>
    <div className='flex flex-col items-center justify-center h-full'> 
      <div className='space-y-6 w-full px-4'> 
        {/* Navigation Links in Mobile Menu */}
        <Link 
          to="/" 
          className="block w-full text-center py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md"
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link 
          to="/events" 
          className="block w-full text-center py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md"
          onClick={() => setMobileMenuOpen(false)}
        >
          My Events
        </Link>
        <Link 
          to="/about" 
          className="block w-full text-center py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md"
          onClick={() => setMobileMenuOpen(false)}
        >
          Saved Events
        </Link>
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="block w-full text-center py-3 text-lg font-medium bg-white-100 text-black hover:bg-orange-600 hover:text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20">
       <Outlet /> {/* This renders the nested routes */}
      </main>
    </div>
  );
}
