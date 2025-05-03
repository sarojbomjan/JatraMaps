import React, { useState, useEffect, useRef, useReducer } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Tag,
  ImageIcon,
  Save,
  Upload,
} from "lucide-react";
import { updateEvent } from "../../../utils/eventService";
import toast from "react-hot-toast";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function EditEventModal({
  isOpen,
  onClose,
  onEventUpdated,
  event,
}) {
  const fileInputRef = useRef(null);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: "",
    organizer: "",
    status: "draft",
  });

  useEffect(
    () => {
      if (event) {
        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date || "",
          time: event.time ? convert12to24(event.time) : "",
          location: event.location || "",
          category: event.category || "",
          image: event.image || "",
          organizer: event.organizer || "",
          status: event.status || "draft",
        });
      }
    },
    [event],
    [reducerValue]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous image URL if exists
      if (formData.previewImage) {
        URL.revokeObjectURL(formData.previewImage);
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const formatTimeTo12Hour = (timeString) => {
    if (!timeString) return "";

    if (timeString.includes("AM") || timeString.includes("PM")) {
      return timeString;
    }

    const [hours, minutes] = timeString.split(":");
    const hourInt = parseInt(hours, 10);

    const period = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
  };

  const convert12to24 = (time12h) => {
    if (!time12h) return "";

    const [time, period] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (period === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  };

  const isPastDate = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFormData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date.trim(),
      time:
        formData.time.includes("AM") || formData.time.includes("PM")
          ? formData.time.trim()
          : formatTimeTo12Hour(formData.time.trim()),
      location: formData.location.trim(),
      category: formData.category.trim(),
      organizer: formData.organizer.trim(),
      status: formData.status.trim(),
    };

    const requiredFields = [
      "title",
      "description",
      "date",
      "location",
      "category",
      "organizer",
    ];

    for (let field of requiredFields) {
      const value = trimmedFormData[field];
      if (!value) {
        toast.error(`Please enter a valid ${field}`);
        return;
      }
    }

    try {
      const updatedEvent = await updateEvent(event.id, trimmedFormData);
      toast.success("Event updated successfully");
      onEventUpdated(forceUpdate);
      onClose();
    } catch (err) {
      console.error("Failed to update event.", err);
      toast.error("Failed to update event.");
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-600 z-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Edit Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Event Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter event title"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Describe your event"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                <Calendar className="inline-block h-4 w-4 mr-1" /> Date*
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-100 mb-1">
                <Clock className="inline-block h-4 w-4 mr-1" /> Time
              </label>
              <TimePicker
                onChange={(time) => setFormData({ ...formData, time })}
                value={formData.time}
                disableClock={true}
                className="w-full [&>div]:border-gray-300 [&>div]:rounded-md"
                clearIcon={null}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                <MapPin className="inline-block h-4 w-4 mr-1" /> Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter event location"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                <Tag className="inline-block h-4 w-4 mr-1" /> Category*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a category</option>
                <option value="Cultural">Cultural</option>
                <option value="Music">Music</option>
                <option value="Food">Food</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="organizer"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Organizer*
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter organizer name"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {formData.date && isPastDate(formData.date) ? (
                  <>
                    <option value="active">Active</option>
                    <option value="ended">Ended</option>
                  </>
                ) : (
                  <>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="ended">Ended</option>
                  </>
                )}
              </select>
            </div>

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
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
