import BiksetJatra from "../assets/Bisketjatra.jpg";
import GhodeJatra from "../assets/GhodeJatra.jpg";
import Dashain from "../assets/dashain.jpg";
import Machindranath from "../assets/Machindranath.jpg";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Dashain Celebration ",
    description:
      "Join us for Dashain in Kathmandu – Celebrate victory, family, and tradition!",
    date: "June 22, 2024",
    location: "Nationwide (Mainly Kathmandu)",
    category: "Religious & Cultural Festival",
    image: Dashain,
  },
  {
    id: 2,
    title: "Ghode Jata",
    description:
      "Join us for Ghode Jatra in Kathmandu – Witness thrilling horse races and cultural pride!",
    date: "July 5, 2024",
    location: "Kathmandu",
    category: "Cultural & Equestrian Festival",
    image: GhodeJatra,
  },
  {
    id: 3,
    title: "Bisket Jatra",
    description:
      "Join us for Bisket Jatra in Bhaktapur – Ring in the New Year with chariots and cheers!",
    date: "July 15, 2024",
    location: "Bhaktapur",
    category: "Cultural & Historical Festival",
    image: BiksetJatra,
  },
  {
    id: 4,
    title: "Seto Machindranath Jatra",
    description:
      "Join us for Seto Machhindranath Jatra in Kathmandu – Celebrate peace and prosperity with divine chariot processions!",
    date: "August 3, 2024",
    location: "Kathmanduy",
    category: "Religious & Spiritual Festival",
    image: Machindranath,
  },
];

export default function UpcomingEvents() {
  const navigate = useNavigate();
  return (
    <div className="py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-center w-full gap-2">
          <h2 className="text-center text-2xl font-bold">Upcoming Events</h2>
        </div>
        <button
          onClick={() => navigate("/calendar")}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          View Calendar
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {/* Event Image */}
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Event Content */}
            <div className="p-4">
              {/* Event Title and Category */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {event.category}
                </span>
              </div>

              {/* Event Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                {event.description}
              </p>

              {/* Event Date and Location */}
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <div>{event.date}</div>
                <div>{event.location}</div>
              </div>
            </div>

            {/* Event Footer */}
            <div className="p-4 pt-0">
              <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
