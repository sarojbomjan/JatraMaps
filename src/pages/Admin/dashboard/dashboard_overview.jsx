import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Plus,
} from "lucide-react";
import UserImg from "../../../assets/user.jpg"
import { getEvents } from '../../../utils/eventService';

const AdminDashboardOverview = () => {
    const [timeRange, setTimeRange] = useState("month");
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Fetch users from API
      fetch("http://localhost:5000/users")
        .then(response => response.json())
        .then(data => {
          if (data.success && Array.isArray(data.users)) {
            setUsers(data.users);  
          } else {
            console.error("Failed to load users:", data.message);
          }
        })
        .catch(error => console.error("Error fetching users:", error));
  
      // Fetch events from API
      const fetchEvents = async () => {
        try {
          setIsLoading(true);
          const data = await getEvents();  

          console.log('Fetched Events:', data);
          
          setEvents(data);
          setError(null);
        } catch (err) {
          console.log("Failed to fetch events", err);
          setError("Failed to load events. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchEvents(); // Call the function to fetch events
    }, []); 

    

    const statsData = {
      totalUsers: users.length,
      totalEvents: events.length,
      revenue: 2500,
      pendingEvents: 23,
    };

    const recentUsers = users.slice(0, 3); // Showing first 3 users for recent users section

    
  
    const pendingEvents = [
      {
        id: "1",
        title: "Tech Startup Meetup",
        organizer: "Tech Hub Inc.",
        date: "June 28, 2024",
        status: "pending",
      },
      {
        id: "2",
        title: "Annual Charity Run",
        organizer: "Helping Hands",
        date: "July 15, 2024",
        status: "pending",
      },
      {
        id: "3",
        title: "Local Food Festival",
        organizer: "Foodies Association",
        date: "August 5, 2024",
        status: "pending",
      },
    ]
  
    const recentActivity = [
      {
        id: "1",
        type: "eventApproved",
        message: "Event 'Tech Conference 2024' was approved",
        time: "10 minutes ago",
      },
      {
        id: "2",
        type: "userRegistered",
        message: "New user registered: John Smith",
        time: "1 hour ago",
      },
      {
        id: "3",
        type: "eventCreated",
        message: "New event created: Summer Music Festival",
        time: "2 hours ago",
      },
      {
        id: "4",
        type: "categoryAdded",
        message: "New category added: Workshops",
        time: "3 hours ago",
      },
      {
        id: "5",
        type: "issueReported",
        message: "Issue reported on event 'Art Exhibition'",
        time: "5 hours ago",
      },
    ]
  
    const getActivityIcon = (type) => {
      switch (type) {
        case "eventApproved":
          return <CheckCircle className="h-5 w-5 text-green-500" />
        case "userRegistered":
          return <User className="h-5 w-5 text-blue-500" />
        case "eventCreated":
          return <Calendar className="h-5 w-5 text-purple-500" />
        case "categoryAdded":
          return <Plus className="h-5 w-5 text-indigo-500" />
        case "issueReported":
          return <AlertTriangle className="h-5 w-5 text-yellow-500" />
        case "eventRejected":
          return <XCircle className="h-5 w-5 text-red-500" />
        default:
          return <Info className="h-5 w-5 text-gray-500" />
      }
    }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className='py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Admin Dashboard</h1>
            <p className='text-gray-600 dark:text-gray-400'>Welcome back</p>
        </div>
        
        <div className='flex items-center space-x-2 w-full sm:w-auto'>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)} 
            className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6'>
        {/* Users Card */}
        <div className='bg-white dark:bg-gray-500 rounded-lg shadow p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 dark:text-black'>Total Users</p>
              <p className='text-2xl font-bold text-gray-900 dark:text-gray-700'>{statsData.totalUsers}</p>
            </div>
            <div className='bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full'>
              <Users className='h-6 w-6 text-blue-600 dark:text-blue-700'/>
            </div>
          </div>
          {/* <div className='mt-2 flex items-center text-xs'>
            <span className={`flex items-center ${statsData.userGrowth >=0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {statsData.userGrowth >=0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(statsData.userGrowth)}%
            </span>
            <span className="text-gray-500 dark:text-gray-900 ml-1">from last {timeRange}</span>
          </div> */}
        </div>
        
        {/* Event Card */}
        <div className='bg-white dark:bg-gray-500 rounded-lg shadow p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 dark:text-black'>Total Events</p>
              <p className='text-2xl font-bold text-gray-900 dark:text-gray-700'>{statsData.totalEvents}</p>
            </div>
            <div className='bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full'>
              <Calendar className='h-6 w-6 text-blue-600 dark:text-blue-700'/>
            </div>
          </div>
          {/* <div className='mt-2 flex items-center text-xs'>
            <span className={`flex items-center ${statsData.eventGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {statsData.eventGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(statsData.eventGrowth)}%
            </span>
            <span className="text-gray-500 dark:text-gray-900 ml-1">from last {timeRange}</span>
          </div> */}
        </div>

        {/* Revenue Card */}
        <div className='bg-white dark:bg-gray-500 rounded-lg shadow p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 dark:text-black'>Total Revenue</p>
              <p className='text-2xl font-bold text-gray-900 dark:text-gray-700'>${statsData.revenue}</p>
            </div>
            <div className='bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full'>
              <DollarSign className='h-6 w-6 text-blue-600 dark:text-blue-700'/>
            </div>
          </div>
          {/* <div className='mt-2 flex items-center text-xs'>
            <span className={`flex items-center ${statsData.revenueGrowth >=0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {statsData.revenueGrowth >=0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(statsData.revenueGrowth)}%
            </span>
            <span className="text-gray-500 dark:text-gray-900 ml-1">from last {timeRange}</span>
          </div> */}
        </div>

        {/* Pending Events Card */}
        <div className="bg-white dark:bg-gray-500 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Events</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{statsData.pendingEvents}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-2">
            <Link to="#" className="text-blue-600 dark:text-blue-400 text-xs hover:underline">
              Review pending events
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Charts */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Performance Overview */}
          <div className='bg-white dark:bg-gray-600 rounded-lg shadow p-4'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Performance Overview</h2>
              <select className="w-full sm:w-auto text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="users">Users</option>
                <option value="events">Events</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
            <div className='h-64'>
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded">
                <p className="text-gray-500">Line Chart Placeholder</p>
              </div>
            </div>
          </div>

          {/* Small Charts */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Event Categories */}
            <div className='bg-white dark:bg-gray-600 rounded-lg shadow p-4'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Event Categories</h2>
              </div>
              <div className='h-48'>
                <div className='flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded'>
                  <p>Pie Chart Placeholder</p>
                </div>
              </div>
            </div>

            {/* Monthly Performance */}
            <div className='bg-white dark:bg-gray-600 rounded-lg shadow p-4'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Monthly Performance</h2>
              </div>
              <div className='h-48'>
                <div className='flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded'>
                  <p>Bar Chart Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='space-y-6'>
          {/* Recent Activity */}
          <div className='bg-white dark:bg-gray-600 rounded-lg shadow'>
            <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activities</h2>
            </div>
            <div className='p-4'>
              <div className='space-y-4'>
                {recentActivity.map((activity) => (
                  <div key={activity.id} className='flex items-start gap-3'> 
                    <div className='h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-300 flex items-center justify-center flex-shrink-0'>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="min-w-0">
                      <p className='text-sm text-gray-900 dark:text-gray-100 truncate'>{activity.message}</p>
                      <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-4 text-center'> 
                <Link to="#" className='text-sm text-blue-600 dark:text-blue-400 hover:underline'>
                  View all activity
                </Link>
              </div>
            </div>
          </div>

          {/* Pending Events */}
          <div className='bg-white dark:bg-gray-600 rounded-lg shadow'>
            <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pending Events</h2>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {pendingEvents.length} Pending
              </span>
            </div>
            <div className='p-4'>
              {pendingEvents.length > 0 ? (
                <div className='space-y-4'>
                  {pendingEvents.map((event) => (
                    <div key={event.id} className='flex flex-col p-3 border border-gray-200 dark:border-gray-400 rounded-lg'>
                      <div className='flex justify-between'>
                        <h3 className='font-medium text-gray-900 dark:text-gray-100 truncate'>{event.title}</h3>
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-0.5 rounded whitespace-nowrap ml-2">Pending</span>
                      </div>
                      <div className='mt-2 text-sm text-gray-100 dark:text-gray-400'>
                        <p className="truncate">Organizer: {event.organizer}</p>
                        <p>Date: {event.date}</p>
                      </div>
                      <div className='mt-3 flex flex-wrap gap-2'>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded whitespace-nowrap">Approve</button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded whitespace-nowrap">
                          Reject
                        </button>
                        <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs rounded whitespace-nowrap">
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4"> 
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No pending events to review</p>
                </div>
              )}
              <div className="mt-4 text-center">
                <Link to="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Manage all events <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* New Users */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">New Users</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={`${UserImg}`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.username}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  View all users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardOverview