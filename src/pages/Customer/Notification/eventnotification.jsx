import { useEffect } from "react";
import { useNotification } from "./notificationcontext";
import { getUpcomingEvents } from "../../../utils/eventService";

const EventNotificationSystem = () => {
  const { addNotification, notifications = [] } = useNotification();

  useEffect(() => {
    const fetchAndCheckEvents = async () => {
      try {
        const upcomingEvents = await getUpcomingEvents();
        checkUpcomingEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const checkUpcomingEvents = (events = []) => {
      const now = new Date();
      const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      events.forEach((event) => {
        if (!event?.date) return;

        try {
          const eventDate = new Date(event.date);
          if (eventDate > now && eventDate <= oneWeekFromNow) {
            const daysUntil = Math.ceil(
              (eventDate - now) / (1000 * 60 * 60 * 24)
            );

            const notificationExists = notifications.some(
              (n) => n.id === `event-${event.id}`
            );

            if (!notificationExists) {
              addNotification({
                id: `event-${event.id}`,
                type: "event_approaching",
                title: "Event Starting Soon",
                message: `${event.title} is starting in ${daysUntil} ${
                  daysUntil === 1 ? "day" : "days"
                }!`,
                time: "Just now",
                read: false,
                eventId: event.id,
                daysUntil,
              });
            }
          }
        } catch (e) {
          console.error("Error processing event date:", e);
        }
      });
    };

    fetchAndCheckEvents();
    const interval = setInterval(fetchAndCheckEvents, 3600000); // Check every hour
    return () => clearInterval(interval);
  }, [addNotification, notifications]);

  return null;
};

export default EventNotificationSystem;
