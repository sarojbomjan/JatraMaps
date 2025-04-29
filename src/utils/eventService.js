import axios from "axios";
import { getAccessToken } from "./auth";

const API_BASE_URL = "http://localhost:5000/events";

// retreive all events
export const getEvents = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching events", error);
    throw error;
  }
};

// retrive single event
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event", error);
    throw error;
  }
};

//create event
export const createEvent = async (formData) => {
  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// update event
export const updateEvent = async (id, eventData) => {
  try {
    const formData = new FormData();

    Object.keys(eventData).forEach((key) => {
      if (key === "image" && eventData[key]) {
        formData.append("image", eventData[key]);
      } else if (eventData[key] !== undefined) {
        formData.append(key, eventData[key]);
      }
    });

    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// delete event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// get upcoming events
export const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/upcoming`);
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming events: ", error);
    throw error;
  }
};

// get past events
export const getPastEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/past`);
    return response.data;
  } catch (error) {
    console.error("Error fetching past events: ", error);
    throw error;
  }
};

// Add comment to event
export const addComment = async (eventId, text) => {
  try {
    const token = getAccessToken();

    const response = await axios.post(
      `${API_BASE_URL}/${eventId}/comments`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment", error);
    throw error;
  }
};

// Get comments for event
export const getEventComments = async (eventId) => {
  try {
    const token = getAccessToken();

    const response = await axios.get(`${API_BASE_URL}/${eventId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments", error);
    throw error;
  }
};

export const approveEvent = async (eventId, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${eventId}/approve`,
      { status },
      { headers: { "Content-Type": "application/json" } }
    );

    // Log the response data
    console.log("Response data:", response.data);

    if (response.status !== 200) {
      throw new Error("Failed to update event status");
    }

    return response.data;
  } catch (error) {
    console.error("Error in approveEvent:", error);
    throw error;
  }
};
