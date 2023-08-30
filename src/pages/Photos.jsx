import axios from "axios";
import { API_URL } from "../../consts";
import { useState, useEffect } from "react";
import { Form, Button, FormControl, InputGroup, Modal } from "react-bootstrap";

const Photos = () => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/photos/`);
      setIsLoading(false);
      setAllPhotos(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage("Something went wrong, please try again later.");
    }
  };

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("image", formData.image);

      await axios.post(`${API_URL}/photos/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({ title: "", image: null });
      fetchData();
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong while adding the photo.");
    }
  };

  const onDelete = async (photoId) => {
    try {
      console.log("Deleting photo with ID:", photoId);
      await axios.delete(`${API_URL}/photos/${photoId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchData();
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong while deleting the photo.");
    }
  };

  return (
    <div className="photo-page page">
      <h1>Gallery</h1>
      {isLoggedIn && (
        <div className="add-photo">
          <h2>Add New Photo</h2>
          <Form onSubmit={onSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                name="title"
                placeholder="Photo Title"
                value={formData.title}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl type="file" name="image" onChange={onChange} />
            </InputGroup>
            <Button variant="primary" type="submit">
              Add Photo
            </Button>
          </Form>
        </div>
      )}
      {isLoading ? (
        <p>Loading photos...</p>
      ) : (
        <ul className="photo-list">
          {allPhotos.map((photo, index) => (
            <li key={index}>
              <div
                className="image-container"
                onClick={() => openModal(`${API_URL}${photo.image}`)}
              >
                <img
                  className="photo-image"
                  src={`${API_URL}${photo.image}`}
                  alt={photo.title}
                />
                <ul className="image-details">
                  <li>{photo.title}</li>
                  {isLoggedIn && (
                    <li>
                      <Button
                        variant="danger"
                        onClick={() => onDelete(photo.id)}
                      >
                        Delete
                      </Button>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showError && <p>{errorMessage}</p>}
      {showModal && (
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Body>
            <img src={selectedImage} alt="Full" className="full-image" />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Photos;
