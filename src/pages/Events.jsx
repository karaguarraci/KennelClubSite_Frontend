import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    address: "",
    description: "",
  });

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
      setErrorMessage("Somthing went wrong");
    }
  };

  const onDelete = async (eventId) => {
    try {
      const eventToDelete = await axios.delete(`${API_URL}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setAllEvents((prevEvents) =>
      //   prevEvents.filter((event) => event.id !== eventId)
      // );
      window.location.reload();
      console.log(eventToDelete);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="events-page page">
      <h1>Events</h1>
      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="events-list">
          {allEvents.map((event) => (
            <li key={event.id}>
              <div className="event-box">
                <div className="event-details">
                  <ul>
                    <li className="event-title">Event: {event.title}</li>
                    <li>Date: {event.date}</li>
                    <li>Address: {event.address}</li>
                    <li>Description: {event.description}</li>
                  </ul>
                  <Button variant="danger" onClick={() => onDelete(event.id)}>
                    <FaTimes /> Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
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
          <Button type="submit" variant="success" onClick={onSubmit}>
            Add Event
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Events;
