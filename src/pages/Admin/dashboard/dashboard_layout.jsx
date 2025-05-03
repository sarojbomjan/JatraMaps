import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";

import { Sidebar, SidebarContext, SidebarItem } from "../sidebar";
import { useAuth } from "../../../utils/authContext";

const AdminDashboardLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("Logout initiated from AdminDashboard");
    logout();
    console.log("Logout function completed");
  };

  const navigation = [
    {
      name: "Dashboard",
      to: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: location.pathname === "/admin",
    },
    {
      name: "Events",
      to: "/admin/dashboard/manageevents",
      icon: <Calendar className="h-5 w-5" />,
      active: location.pathname.startsWith("/admin/events"),
    },
    {
      name: "Users",
      to: "/admin/dashboard/manageusers",
      icon: <Users className="h-5 w-5" />,
      active: location.pathname.startsWith("/admin/users"),
    },
  ];

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 z-50 transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg lg:hidden`}
        >
          <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              JatraMaps
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition ${
                  item.active
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar>
            {navigation.map((item) => (
              <SidebarItem
                key={item.name}
                icon={item.icon}
                text={item.name}
                active={item.active}
                to={item.to}
              />
            ))}
            <SidebarItem
              icon={<LogOut className="h-5 w-5" />}
              text="Logout"
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            />
          </Sidebar>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile top bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              JatraMaps
            </h2>
          </div>

          {/* Mobile top bar spacer */}
          <div className="lg:hidden h-16"></div>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div
              className={`transition-all duration-300 ${
                expanded ? "lg:ml-0" : "lg:ml-0"
              }`}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default AdminDashboardLayout;
