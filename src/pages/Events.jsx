import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/events/`);
        setIsLoading(false);
        setAllEvents(data);
      } catch (err) {
        console.log(err);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="events-page page">
      <h1>Events</h1>
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {allEvents.map((event) => (
            <li key={event.title}>
              <ul>
                <li>Event: {event.title}</li>
                <li>Date: {event.date}</li>
                <li>Address: {event.address}</li>
                <li>Description: {event.description}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Events;
