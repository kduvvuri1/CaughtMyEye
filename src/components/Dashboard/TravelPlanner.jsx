// TravelPlanner.jsx
export default function TravelPlanner({ landmark }) {
  const [userLocation, setUserLocation] = useState(null);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });

    // Fetch travel data
    const fetchData = async () => {
      const flights = await SkyscannerAPI.search({
        from: userLocation,
        to: landmark.location,
        budget: currentUser.travelPreferences.budget
      });
      setFlights(flights);
    };
    fetchData();
  }, [landmark]);

  return (
    <div>
      <h2>Travel to {landmark.name}</h2>
      <FlightList flights={flights} />
      <HotelList hotels={hotels} />
    </div>
  );
}