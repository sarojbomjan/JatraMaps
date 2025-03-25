import { Calendar, MapPin, Clock } from "lucide-react";
import ShwetBhairav from "../assets/ShwetBhairav.jpg";

export default function FeaturedEvent() {
  return (
    <>
    <div className="flex items-center justify-between mb-6">
  <div className="flex items-center justify-center gap-2 w-full">
    <h2 className="text-2xl font-bold text-center">Featured Events</h2>
  </div>

</div>

     <div className="relative rounded-xl bg-gradient-to-r from-blue-500/10 to-green-500/5 border m-5">
      <div className="absolute inset-0 bg-orange-500 opacity-30 bg-cover bg-center" />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Indra Jatra</h2>
          <p className="text-muted-foreground">
          Join us for the vibrant celebration of <span className="font-bold">Indra Jatra</span>, one of Nepal's most iconic festivals! Experience the grandeur of traditional dances, colorful processions, and the divine presence of Kumari. Immerse yourself in the rich culture, music, and rituals that bring the streets of Kathmandu to life. Don't miss this unforgettable cultural extravaganza!
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm">June 15-17, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Basantapur, Kathmandu</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm">10:00 AM - 10:00 PM</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">Register Now</button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">Learn More</button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="aspect-square w-full max-w-[300px] rounded-xl overflow-hidden">
            <img
              src={ShwetBhairav}
              alt="Cultural Festival"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg"; // Fallback image
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
