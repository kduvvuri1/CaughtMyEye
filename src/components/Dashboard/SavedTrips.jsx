// SavedTrips.jsx
import { Accordion } from 'react-accessible-accordion';

export default function SavedTrips() {
  const { currentUser } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const q = query(
        collection(db, "saved-trips"),
        where("userId", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      setTrips(snapshot.docs.map(doc => doc.data()));
    };
    fetchTrips();
  }, []);

  return (
    <Accordion allowZeroExpanded>
      {trips.map((trip) => (
        <AccordionItem key={trip.id}>
          <AccordionItemHeading>
            <h3>{trip.destination}</h3>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>Flight: {trip.flight}</p>
            <p>Hotel: {trip.hotel}</p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}