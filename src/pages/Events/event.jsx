import React, { useEffect, useState } from 'react'
import BiksetJatra from "../../assets/Bisketjatra.jpg"
import GhodeJatra from "../../assets/GhodeJatra.jpg";
import Dashain from "../../assets/dashain.jpg";
import Machindranath from "../../assets/Machindranath.jpg";

import { Calendar, MapPin, Users, Clock, ChevronRight, Search } from "lucide-react"
import { Link } from 'react-router-dom';
import { getPastEvents, getUpcomingEvents } from '../../utils/eventService';

const EventsPage = () => {

    const [activeTab, setActiveTab] = useState("upcoming");
    const [searchQuery, setSearchQuery] = useState("");
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const [upcoming, past] = await Promise.all(
              [
                getUpcomingEvents(),
                getPastEvents(),
              ]
            );

            setUpcomingEvents(upcoming);
            setPastEvents(past);

            setIsLoading(false)
        } catch (error) {
            console.error("Failed to fetch events", error)
        }
      }

      fetchEvents();
    })

// Filter events based on search query
  const filteredUpcomingEvents = upcomingEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPastEvents = pastEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className='mt-8'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-900'>My Events</h1>
        <p className='text-gray-600 dark:text-gray-500'>Manage your upcoming and past events</p>
      </div>

      {/* Search and filter */}
      <div className='mt-6'>
        <div className='relative'>
            <input 
            type="text" 
            placeholder='Search events.......'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'/>
        </div>
      </div>

      {/* Events */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow mt-6'>
        <div className='border-b border-gray-200 dark:border-gray-700'>
            <div className='flex'>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "upcoming"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Events ({filteredUpcomingEvents.length})
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "past"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Events ({filteredPastEvents.length})
            </button>
            </div>
        </div>

        <div className="p-4">
          {activeTab === "upcoming" ? (
            <>
              {filteredUpcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredUpcomingEvents.map((event) => (
                    <Link to={`/customer/dashboard/events/${event.id}`}  key={event.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={event.image.url || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
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
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery ? "No upcoming events match your search." : "You don't have any upcoming events."}
                  </p>
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear search
                    </button>
                  ) : (
                    <Link to="/customer/dashboard/events" className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline">
                      Browse events
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {filteredPastEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredPastEvents.map((event) => (
                    <Link to={`/customer/dashboard/events/${event.id}`} key={event.id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={event.image.url || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
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
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery ? "No past events match your search." : "You haven't attended any events yet."}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventsPage
