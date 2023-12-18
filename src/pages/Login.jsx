import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login/`,
        formData
      );
      console.log(`this is the user data ${data}`);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userData", data);
      navigate("/");
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <div className="form_page">
      <div className="background_images">
        {/* <img
          src={login_background_image}
          alt="Background image"
          className="form_background_image"
        /> */}
      </div>
      <Container className="form_container">
        <Form onSubmit={onSubmit} className="sl_form login_form">
          <h3 className="form_header login">Login</h3>
          <Form.Group controlId="email">
            <Form.Control
              className="input_text"
              type="email"
              value={formData.email}
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              className="input_text"
              type="password"
              value={formData.password}
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button className="login-button" variant="success" type="submit">
            Login
          </Button>
        </Form>

        {showError && (
          <div className="container p-5 lerror">
            <div
              className="alert alert-danger alert-dismissible fade show loginerror"
              role="alert"
            >
              <strong>Something went wrong...</strong>
              <button
                type="button"
                className="close lclosebutton"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowError(false)}
              >
                <span aria-hidden="True">&times;</span>
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Login;
