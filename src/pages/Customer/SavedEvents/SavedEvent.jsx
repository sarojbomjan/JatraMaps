import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Bookmark,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getBookmarks } from "../../../utils/bookmarkEventService";
import { getEventById } from "../../../utils/eventService";

const SavedEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load saved events
  useEffect(() => {
    const loadSavedEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get bookmarked IDs from localStorage
        const bookmarkedIds = getBookmarks();

        // Fetch details for each bookmarked event
        const eventPromises = bookmarkedIds.map((id) =>
          getEventById(id).catch((e) => {
            console.error(`Failed to fetch event ${id}:`, e);
            return null;
          })
        );

        const eventResults = await Promise.all(eventPromises);

        setEvents(eventResults.filter((event) => event !== null));
      } catch (err) {
        console.error("Failed to load saved events:", err);
        setError("Failed to load saved events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadSavedEvents();
  }, []);

  // Remove event from saved list
  const removeEvent = async (id) => {
    try {
      // Optimistically update UI
      setEvents((prev) => prev.filter((event) => event.id !== id));

      // Update localStorage
      const updatedBookmarks = getBookmarks().filter(
        (eventId) => eventId !== id
      );
      localStorage.setItem(
        "bookmarkedEvents",
        JSON.stringify(updatedBookmarks)
      );
    } catch (error) {
      console.error("Failed to remove event:", error);
      setError("Failed to remove event. Please try again.");
      // Optionally: reload events to revert UI
      const bookmarkedIds = getBookmarks();
      const eventPromises = bookmarkedIds.map((id) => getEventById(id));
      const eventResults = await Promise.all(eventPromises);
      setEvents(eventResults.filter((event) => event !== null));
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-2 text-blue-500 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-700">
          Saved Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Events you've bookmarked for later
        </p>
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
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-24 w-40 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={event.image?.url || "/placeholder.svg"}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <Link to={`/customer/dashboard/events/${event.id}`}>
                        {event.title}
                      </Link>
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
                      to={`/customer/dashboard/events/${event.id}`}
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {events.length === 0
                  ? "No saved events yet"
                  : "No matching saved events"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery
                  ? "No saved events match your search."
                  : "You haven't saved any events yet."}
              </p>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear search
                </button>
              ) : (
                <Link
                  to="/customer/dashboard/events"
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Browse events
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedEvent;
