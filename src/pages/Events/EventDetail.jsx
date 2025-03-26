import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Bookmark,
  MessageSquare,
  Heart,
  Send,
  ChevronLeft,
  Star,
  StarHalf,
  Building,
  Ticket
} from "lucide-react"
import BiksetJatra from "../../assets/BisketJatra.jpg"
import GhodeJatra from "../../assets/GhodeJatra.jpg";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  const [comments, setComments] = useState([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "I'm really looking forward to this event!",
      date: "2 days ago",
      likes: 5,
    },
    {
      id: "2",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: "Last year's event was amazing.",
      date: "1 day ago",
      likes: 3,
    },
  ]);

  const allEvents = [
    {
      id: "1",
      title: "Bisket Jatra",
      date: "June 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Kathmandu",
      attendees: 1240,
      description: "Traditional Newari festival celebrating the Nepalese New Year with colorful processions, cultural performances, and traditional rituals. The festival marks the beginning of the new year in the Bikram Sambat calendar and is celebrated with great enthusiasm in the Kathmandu Valley.",
      image: BiksetJatra,
      organizer: "Newa Cultural Organization",
      tags: ["Cultural", "Festival", "Traditional", "Newari"],
      schedule: [
        { time: "9:00 AM - 10:00 AM", title: "Morning Procession" },
        { time: "10:00 AM - 11:30 AM", title: "Traditional Dance Performances" },
        { time: "11:45 AM - 12:45 PM", title: "Cultural Exhibition" },
        { time: "1:00 PM - 2:00 PM", title: "Lunch Break" },
        { time: "2:15 PM - 3:15 PM", title: "Ritual Ceremonies" },
        { time: "3:30 PM - 4:30 PM", title: "Community Gatherings" },
        { time: "4:30 PM - 5:00 PM", title: "Closing Ceremony" },
      ],
      rating: 4.5,
      reviews: 28,
      price: "Free"
    },
    {
        id: "2",
        title: "Ghode Jatra",
        date: "June 15, 2024",
        time: "9:00 AM - 5:00 PM",
        location: "Kathmandu",
        attendees: 1240,
        description: "Traditional Newari festival celebrating the Nepalese New Year with colorful processions, cultural performances, and traditional rituals. The festival marks the beginning of the new year in the Bikram Sambat calendar and is celebrated with great enthusiasm in the Kathmandu Valley.",
        image: GhodeJatra,
        organizer: "Newa Cultural Organization",
        tags: ["Cultural", "Festival", "Traditional", "Newari"],
        schedule: [
          { time: "9:00 AM - 10:00 AM", title: "Morning Procession" },
          { time: "10:00 AM - 11:30 AM", title: "Traditional Dance Performances" },
          { time: "11:45 AM - 12:45 PM", title: "Cultural Exhibition" },
          { time: "1:00 PM - 2:00 PM", title: "Lunch Break" },
          { time: "2:15 PM - 3:15 PM", title: "Ritual Ceremonies" },
          { time: "3:30 PM - 4:30 PM", title: "Community Gatherings" },
          { time: "4:30 PM - 5:00 PM", title: "Closing Ceremony" },
        ],
        rating: 4.5,
        reviews: 28,
        price: "Free"
      },
  ];

  useEffect(() => {
    const foundEvent = allEvents.find(e => e.id === eventId);
    setEvent(foundEvent);
  }, [eventId]);

  if (!event) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: commentText,
      date: "Just now",
      likes: 0,
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button and Title */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 mr-1"/>
          Back to events
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-600 mt-4">{event.title}</h1>
      </div>

      {/* Event Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        {/* Event Image */}
        <div className="relative h-80 w-full">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-gray-900 dark:text-white">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                  <p className="text-gray-900 dark:text-white">{event.time}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendees</p>
                  <p className="text-gray-900 dark:text-white">{event.attendees.toLocaleString()} attending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start">
              <Building className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Organizer</p>
                <p className="text-gray-900 dark:text-white">{event.organizer}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Ticket className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0"/>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</p>
                <p className="text-gray-900 dark:text-white">{event.price}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About this event</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
          </div>

          {/* Schedule */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Schedule</h2>
            <div className="space-y-4">
              {event.schedule.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-40 flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium px-4 py-2 rounded-lg">
                    {item.time}
                  </div>
                  <div className="ml-4 mt-2 text-gray-900 dark:text-gray-100">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md">
              RSVP Now
            </button>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium px-4 py-3 rounded-lg transition-colors">
              <Bookmark className="h-5 w-5" />
              Save
            </button>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium px-4 py-3 rounded-lg transition-colors">
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Ratings and Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ratings & Reviews</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="flex items-center mr-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${starValue <= event.rating ? 'fill-current' : starValue - 0.5 <= event.rating ? 'fill-current opacity-50' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    );
                  })}
                </div>
                <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">{event.rating}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">Based on {event.reviews} reviews</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Write a review
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Comments</h2>
        </div>
        <div className="p-6">
          <form  className="mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <textarea
                    rows={3}
                    name="comment"
                    id="comment"
                    className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={!commentText.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={comment.user.avatar || "/placeholder.svg"}
                      alt={comment.user.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{comment.user.name}</h3>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{comment.text}</p>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                      <Heart className="h-4 w-4 mr-1" />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                      <span className="ml-1">Like</span>
                    </button>
                    <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default EventDetail;