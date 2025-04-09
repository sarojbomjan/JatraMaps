import { useState, useRef } from "react";
import { X, Calendar, Clock, MapPin, Tag, ImageIcon, Save, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { createEvent } from "../../../utils/eventService";

export default function EventFormModal({ isOpen, onClose, onEventCreated}) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null,
    previewImage: "",
    organizer: "",
    price: "Free",
    status: "draft",
  });

  const fileInputRef = useRef(null);

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous image URL if exists
      if (formData.previewImage) {
        URL.revokeObjectURL(formData.previewImage);
      }
      
      setFormData(prev => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // create event
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
  
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
  
      // Call createEvent with the form data
      const createdEvent = await createEvent(formDataToSend);
      
      // Show success message
      toast.success("Event created successfully!", { id: "event-success" });

      if (onEventCreated) {
        onEventCreated();
      }
      // Reset the form after successful submission
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating event", error);
      //setError(error.message || "Failed to create event");
      toast.error("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  }

  const resetForm = () => {
    if (formData.previewImage) {
      URL.revokeObjectURL(formData.previewImage);
    }
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      image: null,
      previewImage: "",
      organizer: "",
      price: "Free",
      status: "draft",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-600 z-10 flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Create New Event</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event title"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your event"
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium  text-gray-600 dark:text-gray-100 mb-1">
                <Calendar className="inline-block h-4 w-4 mr-1" /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                <Clock className="inline-block h-4 w-4 mr-1" /> Time
              </label>
              <input
                type="text"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 9:00 AM - 5:00 PM"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium  text-gray-600 dark:text-gray-100 mb-1">
                <MapPin className="inline-block h-4 w-4 mr-1" /> Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event location"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                <Tag className="inline-block h-4 w-4 mr-1" /> Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Cultural">Cultural</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
              </select>
            </div>

            {/* Organizer */}
            <div>
              <label htmlFor="organizer" className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                Organizer
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter organizer name"
              />
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium  text-gray-600 dark:text-gray-100 mb-1">
                        Price
                </label>
                    <select
                        id="price"
                        name="price"
                        alue={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        <option value="Free">Free</option>
                        <option value="10">$10</option>
                        <option value="20">$20</option>
                        <option value="50">$50</option>
                        <option value="custom">Custom Amount</option>
                    </select>
                        {formData.price === "custom" && (
                        <input
                             type="number"
                              name="customPrice"
                            placeholder="Enter custom price"
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                            onChange={(e) => setFormData({...formData, customPrice: e.target.value})}
                            />
                        )}
                    </div>
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                <ImageIcon className="inline-block h-4 w-4 mr-1" /> Event Image
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 dark:text-gray-100 hover:bg-gray-800 hover:text-gray-400"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </button>
                {formData.previewImage && (
                  <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={formData.previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Upload a high-quality image for your event (JPG, PNG)
              </p>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="ended">Ended</option>

              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}