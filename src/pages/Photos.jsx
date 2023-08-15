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
        <ul>
          {allPhotos.map((photo) => (
            <li key={photo.title}>
              <ul>
                <img src={`${API_URL}${photo.image}`} alt={photo.title} />
                {console.log(photo.image)}
                <li>{photo.title}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Photos;
