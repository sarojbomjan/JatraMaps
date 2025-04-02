import React, { useState, useContext, createContext } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Bell,
  MessageSquare,
  PlusCircle,
  Home,
  Globe,
  Tag,
  LayoutDashboard,
  ChevronFirst,
  ChevronLast,
  MoreVertical
} from "lucide-react"

import UserLogo from "../../../assets/user.jpg";
import { Sidebar, SidebarContext, SidebarItem } from '../sidebar';
import { useSidebar } from '../../../utils/useSiderbar';

const AdminDashboardLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  const navigation = [
    { name: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" />, active: location.pathname === "/admin" },
    { name: "Events", to: "/admin/dashboard/manageevents", icon: <Calendar className="h-5 w-5" />, active: location.pathname.startsWith("/admin/events") },
    { name: "Users", to: "/admin/users", icon: <Users className="h-5 w-5" />, active: location.pathname.startsWith("/admin/users") },
    { name: "Categories", to: "/admin/categories", icon: <Tag className="h-5 w-5" />, active: location.pathname.startsWith("/admin/categories") },
    { name: "Site Settings", to: "/admin/settings", icon: <Settings className="h-5 w-5" />, active: location.pathname.startsWith("/admin/settings") },
  ];

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-800 flex'>
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            className='fixed inset-0 bg-black opacity-50 z-40 lg:hidden' 
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
        
        <div 
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out shadow-lg lg:hidden`}
        > 
          <div className='p-4 flex justify-between items-center border-b dark:border-gray-700'>
            <h2 className='text-xl font-bold text-blue-600 dark:text-blue-400'>JatraMaps</h2>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
          <nav className='mt-4 space-y-2'>
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.to} 
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition ${
                  item.active 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Sidebar */}
        <div className='hidden lg:flex'>
          <Sidebar>
            {navigation.map((item) => (
              <SidebarItem 
                key={item.name}
                icon={item.icon}
                text={item.name}
                active={item.active}
                to={item.to}
              />
            ))}
          </Sidebar>   
        </div>
        
        {/* Main Content Area */}
        <div className='flex-1 flex flex-col min-w-0'>
          {/* Mobile top bar */}
          <div className='lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center'>
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            >
              <Menu className='h-6 w-6' />
            </button>
            <h2 className='text-xl font-bold text-blue-600 dark:text-blue-400'>JatraMaps</h2>
          </div>

          {/* Mobile top bar spacer */}
          <div className="lg:hidden h-16"></div>

          {/* Top Bar */}
          <div className='sticky top-0 z-20 flex-shrink-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hidden lg:block'>
            <div className='flex items-center justify-between h-full px-6'>
              <div className='flex items-center'>
                <div className='relative w-64'>
                  <input 
                    type="text"
                    placeholder="Search..."
                    className="w-full h-9 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <Search className='absolute left-3 top-2 h-5 w-5 text-gray-400'/>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <button className='p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 relative'>
                  <Bell className='h-6 w-6'/>
                  <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500'></span>
                </button>
                <button className='p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 relative'>
                  <MessageSquare className="h-6 w-6"/>
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <button 
                  className='flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors'
                  onClick={() => navigate('/admin/events/create')}
                >
                  <PlusCircle className='h-4 w-4 mr-1'/>
                  Create Event
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className={`transition-all duration-300 ${
              expanded ? "lg:ml-0" : "lg:ml-0"
            }`}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

export default AdminDashboardLayout;