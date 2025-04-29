import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  TrendingUp,
  User,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Clock,
  ChevronDown,
} from "lucide-react";

import UserImg from "../../../assets/user.jpg";
import { getEvents } from "../../../utils/eventService";
import BarChart from "../charts/barchart";
import PieChart from "../charts/piechart";

const AdminDashboardOverview = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from API
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Failed to load users:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch events from API
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await getEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.log("Failed to fetch events", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const statsData = {
    totalUsers: users.length,
    totalEvents: events.length,
    pendingEvents: events.filter((event) => event.status === "pending").length,
    activeUsers: Math.floor(users.length * 0.7),
  };

  const recentUsers = users.slice(0, 4); // Showing first 4 users for recent users section
  const pendingEvents = events
    .filter((event) => event.status === "pending")
    .slice(0, 3);

  const categoryData = {
    labels: ["Cultural", "Food", "Art", "Sports"],
    values: [32, 28, 21, 18],
    colors: ["#6366F1", "#3B82F6", "#EF4444", "#EC4899"],
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-8">
      {/* Header */}
      <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Users Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {statsData.totalUsers}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Event Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Events
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {statsData.totalEvents}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Pending Events Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pending Events
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {statsData.pendingEvents}
              </p>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-yellow-600 dark:text-yellow-400 ml-1">
                  Need review
                </span>
              </div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              to="/admin/dashboard/manageevents"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center"
            >
              Review now <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Event Categories */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Event Categories Distribution
                </h2>
                <div className="flex items-center">
                  <Link
                    to="/admin/dashboard/manageevents"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    View details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="h-80">
                <PieChart data={categoryData} height={320} />
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Top category:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    Cultural (32%)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Events */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-400 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pending Events
              </h2>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {pendingEvents.length} Pending
              </span>
            </div>
            <div className="p-5">
              {pendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pendingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col p-3 border border-gray-200 dark:border-gray-400 rounded-lg"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {event.title}
                        </h3>
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-0.5 rounded whitespace-nowrap ml-2">
                          Pending
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <p className="truncate">Organizer: {event.organizer}</p>
                        <p className="flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" /> {event.date}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md whitespace-nowrap transition-colors">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md whitespace-nowrap transition-colors">
                          Reject
                        </button>
                        <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs rounded-md whitespace-nowrap transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto bg-gray-100 dark:bg-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No pending events to review
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-400 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Users
              </h2>
              <Link
                to="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-400 shadow">
                        <img
                          src={UserImg}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-0.5 rounded">
                          New
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <div className="mx-auto bg-gray-100 dark:bg-gray-400 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                      <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No recent users
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
