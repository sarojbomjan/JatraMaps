import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import HeroSection from '../components/hero_section'
import FeaturedEvent from '../components/featured_event'
import UpcomingEvents from '../components/upcoming_event'

const Home = () => {
  return (
    <>
     <HeroSection />

     {/* Featured Event */}
     <section style={{ margin: '60px 0' }}>
      <FeaturedEvent />
    </section>

     {/* Upcoming Events Section */}
     <section>
          <UpcomingEvents />
    </section>

     {/* Community Section */}
     <section className="py-8 bg-muted/30 rounded-xl p-8">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold">Join Our Community</h2>
                  <p className="text-muted-foreground">
                    Connect with event organizers and attendees. Share your experiences and discover new events
                    together.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md">
                      Join Now
                    </button>
                    <button className="bg-background border hover:bg-muted px-6 py-2 rounded-md">Learn More</button>
                  </div>
                </div>
              </section>

  
    </>
   
  )
}

export default Home
