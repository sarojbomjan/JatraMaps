import { Calendar, MapPin, Clock } from "lucide-react";
import ShwetBhairav from "../assets/ShwetBhairav.jpg";
import { useEffect, useState } from "react";
import { getUpcomingEvents } from "../utils/eventService";
import LoginPromptModal from "./showLoginPopup";

export default function FeaturedEvent() {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const upcomingEvents = await getUpcomingEvents();

        if (upcomingEvents.length > 0) {
          const sortedEvents = upcomingEvents.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setFeaturedEvent(sortedEvents[0]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch featured event", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading || !featuredEvent) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6 mt-14">
        <div className="flex items-center justify-center gap-2 w-full">
          <h2 className="text-2xl font-bold text-center">Featured Events</h2>
        </div>
      </div>

      <div className="relative rounded-xl bg-gradient-to-r from-blue-500/10 to-green-500/5 border m-5">
        <div className="absolute inset-0 bg-orange-500 opacity-20 bg-cover bg-center" />
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {featuredEvent.title}
            </h2>
            <p className="text-muted-foreground">{featuredEvent.description}</p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{featuredEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{featuredEvent.time}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleViewDetails}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500/90 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="aspect-square w-full max-w-[300px] rounded-xl overflow-hidden">
              <img
                src={featuredEvent.image.url || { ShwetBhairav }}
                alt={featuredEvent.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <LoginPromptModal isOpen={showModal} onClose={closeModal} />
    </>
  );
}
