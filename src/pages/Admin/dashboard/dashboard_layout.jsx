import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
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
} from "lucide-react"

import UserLogo from "../../../assets/user.jpg";

const AdminDashboardLayout = () => {

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const admin = {
    name: "Admin User",
    email: "admin@jatramaps.com",
    avatar: UserLogo,
    role: "Administrator",
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart2 },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ]

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-800'>

       {/* Mobile Navigation */}
       {mobileMenuOpen && <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={() => setMobileMenuOpen(false)}></div>}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`}> 
        <div className='p-4 flex justify-between items-center border-b dark:border-gray-700'>
          <h2 className='text-xl font-bold text-blue-600 dark:text-blue-400'>JatraMaps</h2>
          <button onClick={() => setMobileMenuOpen(false)} className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'>
            <X className='h-6 w-6' />
          </button>
        </div>
        <nav className='mt-4 space-y-2'>
          {navigation.map((item) => (
            <Link key={item.name} to={item.to} className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition ${isActive(item.to) ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
              <item.icon className='mr-3 h-5 w-5' />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center'>
        <button onClick={() => setMobileMenuOpen(true)} className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'>
          <Menu className='h-6 w-6' />
        </button>
        <h2 className='text-xl font-bold text-blue-600 dark:text-blue-400'>JatraMaps</h2>
      </div>
    

      

      {/* Desktop Navbar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
        <div className='flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700'>
          <div className='flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center'>
              <Link to={""} className='text-xl font-bold text-blue-600 dark:text-blue-400'>Jatra Maps</Link>
            </div>
          </div>

          {/* Navigations */}
          <div className=''>
            <nav>
              {navigation.map((item) => (
                <Link key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                >
                <item.icon className={`mr-5 h-5 w-5 ${
                      isActive(item.href) ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                    }`} />
                {item.name}
                </Link>
              ))}
            </nav>

            <div className='px-4 py-4 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex items-center mb-4'>
                <div className='flex-shrink-0'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                    <img src={admin.avatar || ""} alt={admin.name} 
                    className='h-full w-full object-cover'
                    />
                  </div>
                </div>

                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-800 dark:text-gray-200'>{admin.name}</p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>{admin.role}</p>
                </div>
              </div>

              <div className='space-y-1'>
                <Link href="/" className='flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'>
                  <Globe className='mr-3 h-5 w-5 text-gray-500 dark:text-gray-400'/>
                  View Site
                </Link>
                <Link className='flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'>
                <LogOut className='mr-3 h-5 w-5 text-gray-500 dark:text-gray-400'/>
                Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Main Content */}
    <div className='lg:pl-64 flex flex-col'>
        {/* Mobile top bar spacer */}
        <div className="lg:hidden h-16"></div>

      {/* Top Bar */}
      <div className='sticky top-0 z-10 flex-shrink-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:block hidden'>
          <div className='flex items-center justify-between h-full px-6'>
            <div className='flex items-center'>
              <div className='relative w-64'>
              <input type="text"
                  placeholder="Search..."
                  className="w-full h-9 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Search className='absolute left-3 top-2 h-5 w-5 text-gray-400'/>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <button className='p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 relative" '>
                <Bell className='h-6 w-6'/>
                <span className='absolute top-4  h-2 w-2 rounded-full bg-red-500'></span>
                </button>
                <button className='p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 relative'>
                  <MessageSquare className="h-6 w-6"/>
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <button className='flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors'>
                  <PlusCircle className='h-4 w-4 mr-1'/>
                  Create Event
                </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main>
          <Outlet />
        </main>
    </div >
        
    </div>
  )
}

export default AdminDashboardLayout
