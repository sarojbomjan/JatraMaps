import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import AboutUs from './pages/about'
import EventPage from './pages/event'
import Navbar from './components/navbar'
import Footer from './components/footer'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar*/}
        <Navbar />

      {/* Routings */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/events" element={<EventPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
