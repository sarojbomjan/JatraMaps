import axios from "axios";

const API_BASE_URL = "http://localhost:5000/events"


// retreive all events
export const getEvents = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    }   catch(error){
        console.error("Error fetching events", error);
        throw error;
    }
};

// retrive single event
export const getEventById = async(id) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    }   catch (error) {
        console.error("Error fetching event" , error);
        throw error;
    }
};


//create event
export const createEvent = async (eventData) => {
    try {
        const formDataToSend = new FormData();
        // Append ALL required fields
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('time', formData.time);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('organizer', formData.organizer);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('status', formData.status);
        if (formData.image) {
          formDataToSend.append('image', formData.image);
        }
      
      // Append all event data to formData
      Object.keys(eventData).forEach(key => {
        if (key === 'image' && eventData[key]) {
          formData.append('image', eventData[key]);
        } else {
          formData.append(key, eventData[key]);
        }
      });
  
      const response = await axios.post(API_BASE_URL, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

// update event
export const updateEvent = async (id, eventData) => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('time', formData.time);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('organizer', formData.organizer);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('status', formData.status);
        if (formData.image) {
          formDataToSend.append('image', formData.image);
        }

        // append all event data to formdata
        Object.keys(eventData).forEach(key => {
            if (key === 'image' && eventData[key]) {
              formData.append('image', eventData[key]);
            } else {
              formData.append(key, eventData[key]);
            }
          });
          const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error updating event:', error);
          throw error;
        }
};

// delete event
export const deleteEvent = async (id) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
      }
};