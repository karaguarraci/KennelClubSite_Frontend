import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";

const Committee = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/committee/`);
        setIsLoading(false);
        setCommitteeMembers(data);
      } catch (err) {
        console.log(err);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="committee-page page">
      <h1>Committee</h1>
      {isLoading ? (
        <p>Loading committee members...</p>
      ) : (
        <ul>
          {committeeMembers.map((committeeMember) => (
            <li key={committeeMember.name}>
              <ul>
                <li>Title: {committeeMember.title}</li>
                <li>Name: {committeeMember.name}</li>
                <li>Contact: {committeeMember.contact}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Committee;
