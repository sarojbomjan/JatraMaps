
import { Eye, MapPin, Users } from 'lucide-react'
import React from 'react'

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* About Section Header */}
      <div className="text-center">
        {/* <span className="text-4xl px-4 py-1">
          About Us
        </span> */}
        <h2 className="text-3xl font-bold text-gray-800 mt-4 text-center">
          <span className="text-orange-600">Discover & Explore</span> Jatras Near You!
        </h2>
      </div>

      {/* Description Section */}
      <div className="md:grid-cols-2 gap-6 mt-6">
        <p className="text-gray-700 text-xl text-center">
          <span className='text-orange-600'>JatraMaps</span> is your ultimate guide to discovering Jatra(traditional festivals).  
          We provide an interactive platform where you can explore, locate, and stay updated 
          on the latest jatras happening around you. Using our "Map-Based Interface", you can easily find jatra locations,  
          see event details, and never miss out on any cultural celebration.  
          Whether you're a traveler, enthusiast, or local participant, <span className='text-orange-600'>JatraMaps</span> is here to guide you!
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {/* Feature Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Explore Jatras</h3>
          </div>
          <p className="text-gray-600 mt-2">
            View upcoming jatras with event details, schedules, and highlights in one place.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Locate Jatras</h3>
          </div>
          <p className="text-gray-600 mt-2">
            Find the exact locations of jatras on an interactive map for easy navigation.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Join the Community</h3>
          </div>
          <p className="text-gray-600 mt-2">
            Connect with fellow jatra enthusiasts, share experiences, and celebrate together!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
