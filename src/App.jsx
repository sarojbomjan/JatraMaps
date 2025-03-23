import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import { Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

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
            <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
