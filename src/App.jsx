import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter import
import MainLayout from './components/main_layout';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardOverview from './pages/dashboard/dashboard_overview';
import EventsPage from './pages/Events/event';
import EventDetail from './pages/Events/EventDetail';
import SavedEvent from './pages/SavedEvents/SavedEvent';
import ProfilePage from './pages/Profile/ProfilePage';
import Notification from './pages/Notification/Notification';
import EventPage from './pages/event';

const Home = lazy(() => import('./pages/home'));
const AboutUs = lazy(() => import('./pages/about'));
// const EventPage = lazy(() => import('./pages/event'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Calendar = lazy(() => import('./pages/calendar'));

const App = () => {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <Routes>
        {/* Main routes with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/events" element={<EventPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        
        {/* Dashboard routes with its own layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview/>} />
          <Route path='events' element={<EventsPage />}/>
          <Route path='events/:eventId' element={<EventDetail />}/>
          <Route path='saved-events' element={<SavedEvent />}/>
          <Route path='profile-page' element={<ProfilePage />}/>
          <Route path='notification' element={<Notification />}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;