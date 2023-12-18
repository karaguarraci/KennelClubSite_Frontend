import axios from "axios";
import { useState, useEffect } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/`
        );
        setIsLoading(false);
        const sortedEvents = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setAllEvents(sortedEvents);
        console.log(sortedEvents);
      } catch (err) {
        console.log(err);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async () => {
    // e.preventDefault();
    try {
      await axios.post(`${API_URL}/events/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong");
    }
  };

  const onDelete = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/events/${eventId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong while deleting the event.");
    }
  };

  return (
    <div className="events-page page">
      <div className="event-box">
        <h1>Events</h1>
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          <div>
            <h2>Upcoming Events</h2>
            <div className="row">
              {allEvents
                .filter((event) => new Date(event.date) >= new Date())
                .map((event) => (
                  <div className="col-md-4" key={event.id}>
                    {/* <div className="event-info"> */}
                    <h4>{event.title}</h4>
                    <p>Date: {event.date}</p>
                    <p>Address: {event.address}</p>
                    <p>Description: {event.description}</p>
                    {isLoggedIn && (
                      <Button
                        variant="danger"
                        onClick={() => onDelete(event.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                  // </div>
                ))}
            </div>
            <h2>Past Events</h2>
            <div className="row">
              {allEvents
                .filter((event) => new Date(event.date) < new Date())
                .map((event) => (
                  <div className="col-md-4" key={event.id}>
                    {/* <div className="event-info"> */}
                    <h4>{event.title}</h4>
                    <p>Date: {event.date}</p>
                    <p>Address: {event.address}</p>
                    <p>Description: {event.description}</p>
                    {isLoggedIn && (
                      <Button
                        variant="danger"
                        onClick={() => onDelete(event.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                  // </div>
                ))}
            </div>
          </div>
        )}
        {showError && <p>{errorMessage}</p>}
        {isLoggedIn && (
          <div className="event-form">
            <h2>Add New Event</h2>
            <Form onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={onChange}
                />
              </InputGroup>
              <Button type="submit" variant="success">
                Add Event
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
