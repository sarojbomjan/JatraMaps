import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/main_layout";
import DashboardOverview from "./pages/Customer/dashboard/dashboard_overview";
import DashboardLayout from "./pages/Customer/dashboard/DashboardLayout";
import EventsPage from "./pages/Customer/Events/event";
import EventDetail from "./pages/Customer/Events/EventDetail";
import SavedEvent from "./pages/Customer/SavedEvents/SavedEvent";
import ProfilePage from "./pages/Customer/Profile/ProfilePage";
import Notification from "./pages/Customer/Notification/Notification";
import EventPage from "./pages/event";
import ModeratorDashboard from "./pages/moderatordashboard/dashboard";
import AdminDashboardLayout from "./pages/Admin/dashboard/dashboard_layout";
import AdminDashboardOverview from "./pages/Admin/dashboard/dashboard_overview";
import EventManagement from "./pages/Admin/ManageEvents/eventmanagement";
import { AuthProvider } from "./utils/authContext";
import UserManagement from "./pages/Admin/users/user_management";
import { NotificationProvider } from "./pages/Customer/Notification/notificationcontext";
import ProtectedRoute from "./utils/protectedRoute";
import VerifyEmailPage from "./pages/emailVerification";

const Home = lazy(() => import("./pages/home"));
const AboutUs = lazy(() => import("./pages/about"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Calendar = lazy(() => import("./pages/calendar"));

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Routes>
            {/* Public Main Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Route>

            {/* Customer Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
              <Route path="/customer/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:eventId" element={<EventDetail />} />
                <Route path="saved-events" element={<SavedEvent />} />
                <Route path="profile-page" element={<ProfilePage />} />
                <Route path="notification" element={<Notification />} />
              </Route>
            </Route>

            {/* Admin Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
                <Route index element={<AdminDashboardOverview />} />
                <Route path="manageevents" element={<EventManagement />} />
                <Route path="manageusers" element={<UserManagement />} />
              </Route>
            </Route>

            {/* Moderator Dashboard */}
            <Route element={<ProtectedRoute allowedRoles={["moderator"]} />}>
              <Route
                path="/moderator/dashboard"
                element={<ModeratorDashboard />}
              />
            </Route>
          </Routes>
        </Suspense>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
