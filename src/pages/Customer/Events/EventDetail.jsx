import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
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
  Building,
  Ticket,
} from "lucide-react";
import {
  addComment,
  getEventById,
  getEventComments,
  getEvents,
} from "../../../utils/eventService";
import { getAccessToken } from "../../../utils/auth";
import MyMap from "../../Customer/Map/Map";
import {
  isBookmarked,
  removeBookmark,
  saveBookmark,
} from "../../../utils/bookmarkEventService";
import UserImg from "../../../assets/user.jpg";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isSaved, setIsSaved] = useState(isBookmarked(eventId));

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Just now";

      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleDateString(undefined, options);
    } catch {
      return "Just now";
    }
  };

  // fetch events
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Get event data
        const eventData = await getEventById(eventId);
        setEvent(eventData);

        // Get comments
        const commentsResponse = await getEventComments(eventId);
        const commentsArray = commentsResponse?.comments || [];
        setComments(Array.isArray(commentsArray) ? commentsArray : []);

        // // checks if event is bookmark
        // setIsSaved(isBookmarked(eventId));
      } catch (error) {
        console.error("Failed to fetch data", error);
        if (error.response?.status === 404) {
          navigate("/not-found");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId, navigate, reducerValue]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");

    if (!commentText.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setCommentError("Please login to comment");
      return;
    }

    try {
      const newComment = await addComment(eventId, commentText);

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      forceUpdate();
    } catch (error) {
      let errorMsg = "Failed to post comment";
      if (error.response) {
        if (error.response.status === 401) {
          errorMsg = "Session expired. Please login again.";
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        }
      }
      setCommentError(errorMsg);
    }
  };

  const handleSaveEvent = () => {
    if (isSaved) {
      removeBookmark(eventId);
    } else {
      saveBookmark(eventId);
    }
    setIsSaved(!isSaved);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        Event not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button and Title */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to events
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-600 mt-4">
          {event.title}
        </h1>
      </div>

      {/* Event Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        {/* Event Image */}
        <div className="relative h-80 w-full">
          <img
            src={event.image?.url || "/placeholder-event.jpg"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                {event.category}
              </span>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </p>
                  <p className="text-gray-900 dark:text-white">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Time
                  </p>
                  <p className="text-gray-900 dark:text-white">{event.time}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Attendees
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {event.attendees.toLocaleString()} attending
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start">
              <Building className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Organizer
                </p>
                <p className="text-gray-900 dark:text-white">
                  {event.organizer}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Ticket className="h-5 w-5 mt-1 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price
                </p>
                <p className="text-gray-900 dark:text-white">{event.price}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About this event
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setShowMap(!showMap)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              {showMap ? "Hide Map" : "Show Location"}
            </button>
            <button
              onClick={handleSaveEvent}
              className={`flex items-center gap-2 border ${
                isSaved
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
              } hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-4 py-3 rounded-lg transition-colors`}
            >
              <Bookmark
                className={`h-5 w-5 ${
                  isSaved ? "fill-blue-500 text-blue-500" : ""
                }`}
              />
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>

          {showMap && event?.location && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Event Location
              </h2>
              <MyMap location={event.location} />
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mt-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Comments ({comments.length})
          </h2>
        </div>

        <div className="p-6">
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img src={UserImg} alt="" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <textarea
                    rows={3}
                    className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                {commentError && (
                  <p className="mt-2 text-sm text-red-600">{commentError}</p>
                )}
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={!commentText.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id || comment.id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {/* {comment.user?.avatar && ( */}
                      <img
                        src={UserImg}
                        alt={comment.user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                      {/* // )} */}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {comment.user?.username || "Anonymous"}
                        </h3>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(comment.createdAt || comment.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {comment.text || comment.content}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>Like</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
