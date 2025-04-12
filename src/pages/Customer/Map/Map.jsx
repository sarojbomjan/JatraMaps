import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const fetchCoordinates = async (location) => {
  try {
    // First try with the exact location name
    let response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=np&limit=1`,
      {
        headers: {
          'User-Agent': 'YourAppName/1.0 (your@email.com)' // Required by Nominatim
        }
      }
    );

    let data = await response.json();
    
    // If not found, try with just "Kathmandu Durbar Square"
    // if (data.length === 0 && location.includes(',')) {
    //   const mainLocation = location.split(',')[0].trim();
    //   response = await fetch(
    //     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mainLocation)}&countrycodes=np&limit=1`,
    //     {
    //       headers: {
    //         'User-Agent': 'YourAppName/1.0 (your@email.com)'
    //       }
    //     }
    //   );
    //   data = await response.json();
    // }

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    
    // Fallback to Kathmandu coordinates if specific location not found
    return {
      lat: 27.7046,  // Kathmandu coordinates
      lng: 85.3072
    };
    
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

const MyMap = ({ location }) => {
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoords = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const coordinates = await fetchCoordinates(location);
        if (coordinates) {
          setCoords(coordinates);
        } else {
          setError("Could not find location");
        }
      } catch (err) {
        setError("Failed to load map data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCoords();
  }, [location]);

  if (isLoading) return <div className="h-80 flex items-center justify-center">Loading map...</div>;
  if (error) return <div className="h-80 flex items-center justify-center text-red-500">{error}</div>;
  if (!coords) return <div className="h-80 flex items-center justify-center">Map unavailable</div>;

  return (
    <MapContainer 
      center={[coords.lat, coords.lng]} 
      zoom={16} 
      className="h-80 w-full rounded-lg border border-gray-200"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coords.lat, coords.lng]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;