import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Bell,
  Home,
  Calendar,
  Bookmark,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import Wheel from "../../../assets/Wheel.png";
import { useAuth } from "../../../utils/authContext";
import { useNotification } from "../Notification/notificationcontext";
import EventNotificationSystem from "../Notification/eventnotification";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const { notifications } = useNotification();

  const handleLogout = () => {
    logout();
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="dashboard min-h-screen dark:bg-gray-50 bg-gray-300">
      <EventNotificationSystem events={[]} />

      {/* Dashboard Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 dark:bg-white bg-gray-200 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img src={Wheel} alt="Logo" width={40} height={40} />
              <Link
                to="/customer/dashboard"
                className="ml-2 text-xl font-bold text-orange-600"
              >
                JatraMaps
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/customer/dashboard"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="events"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer transition-colors"
              >
                My Events
              </Link>
              <Link
                to="saved-events"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer transition-colors"
              >
                Saved Events
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Notification Icon with badge */}
              <Link
                to="notification"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer relative transition-colors"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Link>

              {/* Profile Icon */}
              <Link
                to="profile-page"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:block px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-orange-600 hover:text-white rounded-md cursor-pointer transition-colors"
              >
                Logout
              </button>

              {/* Hamburger Icon for Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-40 bg-white pt-16">
          <div className="flex flex-col h-full">
            {/* Menu Items */}
            <div className="flex-1 p-4 space-y-2">
              <MobileMenuItem
                to="/customer/dashboard"
                icon={<Home className="h-5 w-5" />}
                text="Dashboard"
              />
              <MobileMenuItem
                to="/customer/dashboard/events"
                icon={<Calendar className="h-5 w-5" />}
                text="My Events"
              />
              <MobileMenuItem
                to="/customer/dashboard/saved-events"
                icon={<Bookmark className="h-5 w-5" />}
                text="Saved Events"
              />
            </div>

            {/* Footer with Logout */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gray-100 hover:bg-orange-600 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20">
        <Outlet />
      </main>
    </div>
  );
}

// Mobile Menu Item Component
function MobileMenuItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span className="text-orange-600 mr-3">{icon}</span>
      <span className="font-medium text-gray-700">{text}</span>
    </Link>
  );
}
