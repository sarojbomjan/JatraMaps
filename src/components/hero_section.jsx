import React from 'react'

const HeroSection = () => {
  return (
  //  <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white py-16 md:py-24">
    <section className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-700 dark:to-red-800 text-white py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Celebrate Traditions That Inspire</h1>
        <p className="text-lg md:text-xl mb-8">
        Discover and join vibrant Jatras in your community. Connect with culture, spirituality, and people who share your passion for Nepal’s rich heritage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors">
            Explore Events
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
            Create Event
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HeroSection
