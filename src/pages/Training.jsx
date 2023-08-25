import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

const Training = () => {
  const [allTraining, setAllTraining] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });

  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/training/`);
        setIsLoading(false);
        const sortedTraining = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setAllTraining(sortedTraining);
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
  };

  const onSubmit = async () => {
    try {
      await axios.post(`${API_URL}/training/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("onSubmit hit");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong while adding the training.");
    }
  };

  const onDelete = async (trainingId) => {
    try {
      await axios.delete(`${API_URL}/training/${trainingId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(trainingId);
      setAllTraining((prevTraining) =>
        prevTraining.filter((training) => training.id !== trainingId)
      );
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong while deleting the training.");
    }
  };

  return (
    <div className="training-page page">
      <h1>Training</h1>
      {isLoading ? (
        <p>Loading training sessions...</p>
      ) : (
        <ul className="training-list">
          {allTraining.map((training) => (
            <li key={training.id} className="training-item">
              <ul>
                <li>Name: {training.name}</li>
                <li>Date: {training.date}</li>
                <li>Time: {training.time}</li>
                {isLoggedIn && (
                  <li>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(training.id)}
                    >
                      Delete
                    </Button>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {showError && <p className="error-message">{errorMessage}</p>}
      {isLoggedIn && (
        <div className="add-training">
          <h2>Add New Training Session</h2>
          <Form onSubmit={onSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                name="name"
                placeholder="Training Name"
                value={formData.name}
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
                type="time"
                name="time"
                value={formData.time}
                onChange={onChange}
              />
            </InputGroup>
            <Button variant="primary" onClick={onSubmit}>
              Add Training
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Training;
