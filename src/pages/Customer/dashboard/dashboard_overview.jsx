import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react"
import { getAccessToken } from '../../../utils/auth';
import { getPastEvents, getUpcomingEvents } from '../../../utils/eventService';
import { getBookmarks } from '../../../utils/bookmarkEventService';

const DashboardOverview = () => {

    const [activeTab, setActiveTab] = useState("upcoming");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [user, setUser] = useState({
        username: '',
      });

      const [formData, setFormData] = useState({
          username: '',
        });

    const [stats, setStats] = useState([
        { label: "Events Attended", value: 0 },
        { label: "Upcoming Events", value: 0 },
        { label: "Comments", value: 0 },
        { label: "Saved Events", value: 0 },
      ]);

      const recentActivity = [
        {
          id: "1",
          type: "comment",
          event: "Dashain",
          date: "May 10, 2024",
          content: "Looking",
        },
        {
          id: "2",
          type: "rsvp",
          event: "Music Festival",
          date: "1 day ago",
          content: "You RSVP'd to this event",
        },
        {
          id: "3",
          type: "save",
          event: "Charity Run",
          date: "3 days ago",
          content: "You saved this event",
        },
      ]

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = getAccessToken();
            if (!token) {
              setError('No authentication token found');
              setLoading(false);
              return;
            }
    
            const response = await axios.get('http://localhost:5000/users/profile', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            });
            
            const userData = {
              username: response.data?.username,
            }
            setUser(userData);
            setFormData(userData);
            setLoading(false);
    
          } catch (err) {
            if (err.response?.status === 401) {
              clearTokens();
              setError('Session expired. Please login again.');
            } else {
              setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to fetch user data. Please try again later.'
              );
            }
            setLoading(false);
          }
        };

        const fetchEvents = async () => {
          try {
            setLoading(true);
            const [upcoming, past, bookmarks] = await Promise.all(
              [
                getUpcomingEvents(),
                getPastEvents,
                Promise.resolve(getBookmarks())
              ]
            );

            setUpcomingEvents(upcoming);
            setPastEvents(past);

            // update stats
            setStats([
              { label: "Events Attended", value: past.length },
              { label: "Upcoming Events", value: upcoming.length },
              { label: "Comments", value: 0 }, 
              { label: "Saved Events", value: bookmarks.length },
          ]);

            setLoading(false);
          } catch (error){
            setError("Failed to fetch events:");
            setLoading(false);
          }
        };
    
        fetchUserData();
        fetchEvents();
      }, []);

  return (
   <div>
    <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-800">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back,{user.username}</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-5'>
        {stats.map((stats, index) => (
            <div key={index} className='bg-white dark:bg-gray-800 rounded-lg shadow p-4'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {stats.label}
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                    {stats.value}
                </p>
            </div>
        ))}
      </div>

      {/* Events */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow mb-8'>
        <div className='border-b border-gray-200 dark:border-gray-700'>
            <div className='flex'>
                <button className={`px-4 py-3 text-sm font-medium ${activeTab === "upcoming" ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("upcoming")}>
                    Upcoming Events
                </button>
                <button className={`px-4 py-3 text-sm font-medium ${activeTab === "past" ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("past")}>
                    Past Events
                </button>
            </div>
        </div>

        <div className="p-4">
          {activeTab === "upcoming" ? (
            <>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Link to={`/customer/dashboard/events/${event.id}`} key={event.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={event.image.url} alt={event.title} className='object-cover'/>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{event.title}</h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 md:self-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.attendees} attending</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 hidden md:block" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">You don't have any upcoming events.</p>
                  <Link to="/customer/dashboard/events" className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline">
                    Browse events
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              {pastEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <Link to={`/customer/dashboard/events/${event.id}`} key={event.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={event.image.url} alt={event.title} className='object-cover'/>
                         
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{event.title}</h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 md:self-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.attendees} attended</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 hidden md:block" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">You haven't attended any events yet.</p>
                </div>
              )}
            </>
          )}

          <div className="mt-4 text-center">
            <Link
              to="/customer/dashboard/events"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              View all events
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow'>
        <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
          <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>Recent Activity</h2>
        </div>
        <div className='p-4'>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {activity.type === "comment" && <span>💬</span>}
                  {activity.type === "rsvp" && <span>✅</span>}
                  {activity.type === "save" && <span>🔖</span>}
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{activity.event}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No recent activity.</p>
          </div>
        )}
        </div>
      </div>
   </div>    
  )
}

export default DashboardOverview
