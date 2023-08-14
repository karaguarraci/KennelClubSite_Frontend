import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";

const Training = () => {
  const [allTraining, setAllTraining] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/training/`);
        setIsLoading(false);
        setAllTraining(data);
      } catch (err) {
        console.log(err);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="training-page page">
      <h1>Training</h1>
      {isLoading ? (
        <p>Loading training sessions...</p>
      ) : (
        <ul>
          {allTraining.map((training) => (
            <li key={training.name}>
              <ul>
                <li>Name: {training.name}</li>
                <li>Date: {training.date}</li>
                <li>Time: {training.time}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Training;
