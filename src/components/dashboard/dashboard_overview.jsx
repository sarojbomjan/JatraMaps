import React, { useState } from 'react'
import UpcomingEvents from '../upcoming_event';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react"
import BiksetJatra from "../../assets/BisketJatra.jpg"
import GhodeJatra from "../../assets/GhodeJatra.jpg";
import Dashain from "../../assets/dashain.jpg";
import Machindranath from "../../assets/Machindranath.jpg";

const DashboardOverview = () => {

    const [activeTab, setActiveTab] = useState("upcoming");
    const stats = [
        { label: "Events Attended", value: 12 },
        { label: "Upcoming Events", value: 3 },
        { label: "Comments", value: 28 },
        { label: "Saved Events", value: 15 },
      ]

      const upcomingEvents = [
        {
          id: "1",
          title: "Bisket Jatra",
          date: "June 15, 2024",
          time: "9:00 AM - 5:00 PM",
          location: "Kathmandu",
          attendees: 1240,
          image: BiksetJatra,
        },
        {
          id: "2",
          title: "Ghode Jatra",
          date: "July 2, 2024",
          time: "4:00 PM - 11:00 PM",
          location: "City Park",
          attendees: 3500,
          image: GhodeJatra,
        },
      ]
    
      const pastEvents = [
        {
          id: "3",
          title: "Dashain",
          date: "May 10, 2024",
          time: "10:00 AM - 6:00 PM",
          location: "Modern Art Gallery",
          attendees: 850,
          image: Dashain,
        },
        {
          id: "4",
          title: "Machindranath",
          date: "April 22, 2024",
          time: "12:00 PM - 8:00 PM",
          location: "Downtown Square",
          attendees: 1500,
          image: Machindranath,
        },
      ]


  return (
   <div>
    <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Alex!</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
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
                    <Link href={`/dashboard/events/${event.id}`} key={event.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={event.image} alt={event.title} className='object-cover'/>
                         
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
                  <Link href="/events" className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline">
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
                    <Link href={`/dashboard/events/${event.id}`} key={event.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={event.image} alt={event.title} className='object-cover'/>
                         
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
              href="/dashboard/events"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              View all events
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
   </div>    
  )
}

export default DashboardOverview
