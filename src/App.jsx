import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/about'));
const EventPage = lazy(() => import('./pages/event'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Calendar = lazy(() => import('./pages/calendar'));

const App = () => {
  return (
  
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <div className="flex-grow">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/calendar' element={<Calendar />}/>
            </Routes>
          </Suspense>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  );
};

export default App;

