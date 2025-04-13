import { useState } from "react"
import { Bell, Calendar, MessageSquare, Heart, User, Check, X } from "lucide-react"

export default function Notification() {

  const initialNotifications = [
    {
      id: "1",
      type: "event_reminder",
      title: "Event Reminder",
      message: "Tech Conference 2024 is happening tomorrow at 9:00 AM.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      title: "New Comment",
      message: "Sarah Johnson commented on your post about the Music Festival.",
      time: "1 day ago",
      read: false,
    },
    {
      id: "3",
      type: "like",
      title: "New Like",
      message: "Michael Chen liked your comment on Tech Conference 2024.",
      time: "2 days ago",
      read: true,
    },
    {
      id: "4",
      type: "friend_request",
      title: "New Connection",
      message: "Emily Rodriguez wants to connect with you.",
      time: "3 days ago",
      read: true,
    },
    {
      id: "5",
      type: "event_update",
      title: "Event Update",
      message: "The location for Food Festival has been updated.",
      time: "4 days ago",
      read: true,
    },
  ]

  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.read)

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "event_reminder":
      case "event_update":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />
      case "friend_request":
        return <User className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
        <p className="text-gray-600 dark:text-gray-400">Stay updated with your activity</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "all"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "unread"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("unread")}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "read"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("read")}
              >
                Read
              </button>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className="p-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start p-4 rounded-lg ${
                    notification.read ? "bg-white dark:bg-gray-800" : "bg-blue-50 dark:bg-blue-900/20"
                  } border border-gray-100 dark:border-gray-700`}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p
                        className={`text-sm font-medium ${
                          notification.read ? "text-gray-900 dark:text-gray-100" : "text-blue-800 dark:text-blue-300"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                        title="Mark as read"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      title="Delete notification"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <Bell className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No notifications</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === "all"
                  ? "You don't have any notifications yet."
                  : activeTab === "unread"
                    ? "You don't have any unread notifications."
                    : "You don't have any read notifications."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}