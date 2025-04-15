import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const events = [
    { date: "2025-03-22", title: "Dashain Celebration", location: "Kathmandu" },
    { date: "2025-07-05", title: "Ghode Jatra", location: "Kathmandu" },
    { date: "2025-07-15", title: "Bisket Jatra", location: "Bhaktapur" },
    {
      date: "2025-08-03",
      title: "Seto Machindranath Jatra",
      location: "Kathmandu",
    },
  ];

  const getEventForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return events.find((event) => event.date === formattedDate);
  };
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 className="text-5xl">Event Calendar</h1>
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date, view }) => {
            const formattedDate = date.toISOString().split("T")[0];
            const event = events.find((event) => event.date === formattedDate);

            return event ? (
              <div
                style={{
                  background: "#ff5252",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                {event.title}
              </div>
            ) : null;
          }}
        />

        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h3>Selected Date: {date.toDateString()}</h3>
          {getEventForDate(date) ? (
            <div>
              <h4>{getEventForDate(date).title}</h4>
              <p>📍 Location: {getEventForDate(date).location}</p>
            </div>
          ) : (
            <p>No events on this day.</p>
          )}
        </div>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </>
  );
}

export default CalendarPage;
