import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock, Search, Bookmark, X } from "lucide-react"
import BiksetJatra from "../../assets/BisketJatra.jpg"
import GhodeJatra from "../../assets/GhodeJatra.jpg";
import { Link } from 'react-router-dom';

const SavedEvent = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const savedEvents = [
    {
      id: "1",
      title: "Tech Conference 2024",
      date: "June 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center",
      attendees: 1240,
      image: BiksetJatra,
      saved: true,
    },
    {
      id: "2",
      title: "Startup Networking",
      date: "July 10, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Innovation Hub",
      attendees: 120,
      image: GhodeJatra,
      saved: true,
    },
  ]


  // filter events based on search query
  const filteredEvents = savedEvents.filter(
    (event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [events, setEvents] = useState(savedEvents)

  const removeEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <div>
      <div className='mt-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-7  00'>Saved Events</h1>
        <p className="text-gray-600 dark:text-gray-400">Events you've bookmarked for later</p>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search saved events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
        <div className="p-4">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events
                .filter(
                  (event) =>
                    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-gray-100 dark:border-gray-700"
                  >
                    <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={event.image || "/placeholder.svg"} alt={event.title} className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <Link to={`/dashboard/events/${event.id}`}  >{event.title}</Link>
                      </h3>
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
                    <div className="flex space-x-2">
                      <Link
                      to={`/dashboard/events/${event.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => removeEvent(event.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        aria-label="Remove from saved"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <Bookmark className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No saved events</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery ? "No saved events match your search." : "You haven't saved any events yet."}
              </p>
              {searchQuery ? (
                <button onClick={() => setSearchQuery("")} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Clear search
                </button>
              ) : (
                <Link to="/events" className="inline-block text-blue-600 dark:text-blue-400 hover:underline">
                  Browse events
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default SavedEvent
