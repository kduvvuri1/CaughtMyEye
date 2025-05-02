const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Allow requests from your frontend
app.use(cors());
app.use(express.json());

// GOOGLE MAPS API KEY
const GOOGLE_API_KEY = 'AIzaSyBWR0UX-Q5VhUxVxXY27TS7uhmtRvZEbUI';

// Haversine distance function
function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  const R = 6371; // Earth radius in km
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Route to fetch hotels
app.get('/api/hotels', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        type: 'lodging',
        key: GOOGLE_API_KEY
      }
    });

    const hotels = response.data.results.map((hotel) => ({
      id: hotel.place_id,
      name: hotel.name,
      rating: hotel.rating || 0,
      address: hotel.vicinity || 'Unknown Address',
      priceLevel: hotel.price_level || 0,
      distance: `${Math.round(haversineDistance(
        { lat, lng },
        { lat: hotel.geometry.location.lat, lng: hotel.geometry.location.lng }
      ) * 10) / 10} km`,
      location: hotel.geometry.location
    }));

    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});