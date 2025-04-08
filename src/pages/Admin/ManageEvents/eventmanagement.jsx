import {
    Search,
    Filter,
    Users,
    Clock,
    Plus,
    Edit,
    Trash2,
    CheckCircle,
    AlertTriangle,
    XCircle,
    ChevronDown,
    Download,
    Upload,
    MoreHorizontal,
  } from "lucide-react"
import { useEffect, useReducer, useState } from "react"
import EventFormModal from "./event_manage_modal"
import BisketJatra from "../../../assets/Bisketjatra.jpg"
import { deleteEvent, getEvents } from "../../../utils/eventService"
import toast,{ Toaster} from "react-hot-toast"
import { showConfirmationToast } from "../../../utils/toast"

export default function EventManagement(){

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedEvents, setSelectedEvents] = useState([])
  const [showEventModal, setShowEventModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const [reducerValue, forceUpdate] = useReducer(x=> x+1,0);

  // fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);

        const data = await getEvents();
        setEvents(data);
        setError(null);
      } catch(err) {
        console.log("Failed to fetch events", err);
        setError("Failed to load events. Please try again later. ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [reducerValue]);


  // Filter events based on search query, status and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    const matchesCategory = filterCategory === "all" || event.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === "attendees-high") {
      return b.attendees - a.attendees
    } else if (sortBy === "attendees-low") {
      return a.attendees - b.attendees
    } else if (sortBy === "title-az") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "title-za") {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  const handleSelectEvent = (id) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(selectedEvents.filter((eventId) => eventId !== id))
    } else {
      setSelectedEvents([...selectedEvents, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedEvents.length === sortedEvents.length) {
      setSelectedEvents([])
    } else {
      setSelectedEvents(sortedEvents.map((event) => event._id))
    }
  }

 // Single delete
 const handleDeleteEvent = async (id) => {
  if (!selectedEvents.includes(id)) {
    toast.error("Please select the event first");
    return;
  }

  showConfirmationToast(
    "Are you sure you want to delete this event?",
    async () => {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event._id !== id));
        setSelectedEvents(selectedEvents.filter(eventId => eventId !== id));
        toast.success("Event deleted successfully");
      } catch (error) {
        toast.error(`Delete failed: ${error.message}`);
      }
    }
  );
};

// Bulk delete
const handleBulkDelete = async () => {
  if (selectedEvents.length === 0) {
    toast.error("Please select events to delete");
    return;
  }
  showConfirmationToast(
    `Are you sure you want to delete ${selectedEvents.length} selected events?`,
    async () => {
      try {
        await Promise.all(selectedEvents.map(id => deleteEvent(id)));
        setEvents(events.filter(event => !selectedEvents.includes(event._id)));
        setSelectedEvents([]);
        toast.success(`${selectedEvents.length} events deleted successfully`);
      } catch (error) {
        toast.error("Failed to delete selected events");
      }
    }
  );
};

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Pending
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        )
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <Clock className="w-3 h-3 mr-1" />
            Draft
          </span>
        )
      case "canceled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3 mr-1" />
            Canceled
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {status}
          </span>
        )
    }
  }

    return (
        <div>
           <Toaster position="top-center" />
            <div className="m-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Event Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage, edit, and monitor events</p>
                </div>
                <div>
                <button
                        onClick={() => setShowEventModal(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                        <Plus className="h-4 w-4 mr-2" />
                Create Event
                </button>
                </div>
            </div>

            {/* Filter and Search */}
            <div className="bg-white dark:bg-gray-400 rounded-lg shadow p-4 m-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-9 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="h-9 pl-3 pr-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="draft">Draft</option>
                                <option value="canceled">Canceled</option>
                            </select>
                            {/* <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" /> */}
                            </div>

                            <div className="relative">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="h-9 pl-3 pr-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Music">Music</option>
                                <option value="Art">Art</option>
                                <option value="Business">Business</option>
                                <option value="Food">Food</option>
                                <option value="Sports">Sports</option>
                            </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* <div className="flex gap-2">
                            <button lassName="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"> 
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Export</span>    
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Upload className="h-4 w-4" />
                                <span className="hidden sm:inline">Import</span>
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Filter className="h-4 w-4" />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                        </div> */}

                        <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-9 pl-3 pr-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="attendees-high">Most Attendees</option>
                                <option value="attendees-low">Least Attendees</option>
                                <option value="title-az">Title (A-Z)</option>
                                <option value="title-za">Title (Z-A)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedEvents.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            {selectedEvents.length} {selectedEvents.length === 1 ? "event" : "events"} selected
                    </span>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">Approve</button>
                    <button className={`px-3 py-1 bg-red-600 text-white text-sm rounded ${
                          selectedEvents.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                        onClick={handleBulkDelete}
                        disabled={selectedEvents.length === 0}>Delete</button>
                    <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded">
                        Export
                    </button>
                </div>
            </div>
        )}
        {/* Events Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={selectedEvents.length === sortedEvents.length && sortedEvents.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Event
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Attendees
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedEvents.includes(event._id)} 
                        onChange={() => handleSelectEvent(event._id)} 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                        
                      {event.image && (
                          <img 
                                src={event.image.url} 
                               alt={event.title}
                                className="event-image"
                                  />
                        )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{event.organizer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(event.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{event.date}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{event.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                           onClick={() => handleDeleteEvent(event._id)}
                               className={`text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 ${
                            !selectedEvents.includes(event._id) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                  disabled={!selectedEvents.includes(event._id)}
                                  >
                                <Trash2 className="h-4 w-4" />
                          </button>
                        <div className="relative">
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No events found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{sortedEvents.length}</span> of{" "}
                <span className="font-medium">{sortedEvents.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Previous</span>
                  {/* Chevron Left icon */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  aria-current="page"
                  className="z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500 text-blue-600 dark:text-blue-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="sr-only">Next</span>
                  {/* Chevron Right icon */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

        {/* Event Form Modal */}
      <EventFormModal isOpen={showEventModal} onClose={() => setShowEventModal(false)}  onEventCreated={forceUpdate} />
        </div>
    )
}