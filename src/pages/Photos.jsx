import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";

const Photos = () => {
  const [allPhotos, setAllPhotos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/photos/`);
        console.log(data);
        setIsLoading(false);
        setAllPhotos(data);
      } catch (err) {
        console.log(err);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="photo-page page">
      <h1>Gallery</h1>
      {isLoading ? (
        <p>Loading photos...</p>
      ) : (
        <ul className="photo-list">
          {allPhotos.map((photo) => (
            <li key={photo.title}>
              <div className="image-container">
                <img src={`${API_URL}${photo.image}`} alt={photo.title} />
                <ul className="image-details">
                  <li>{photo.title}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Photos;
