import { Link, useNavigate, useLocation } from "react-router-dom";
import { loggedOutNavigationLinks, loggedInNavigationLinks } from "/consts.js";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import GSDLogo from "../assets/GSDLogo.jpg";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function checkLoggedIn() {
    return localStorage.getItem("token") ? true : false;
  }

  useEffect(() => {
    console.log("useEffect hit");
    setIsLoggedIn(checkLoggedIn());
  }, [location]);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <Navbar className="custom-navbar" bg="success" expand="lg">
      <Container>
        <img src={GSDLogo} alt="logo" className="logo-img" />
        <Navbar.Brand as={Link} to={"/"}>
          Heads of the Valley
          <br /> GSD Club
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="all_nav">
          <Nav className="browse_nav">
            <Nav.Link as={Link} to={"/committee"} onClick="hide.bs.dropdown">
              Committee
            </Nav.Link>
            <Nav.Link as={Link} to={"/membership"} onClick="hide.bs.dropdown">
              Membership
            </Nav.Link>
            <Nav.Link as={Link} to={"/training"} onClick="hide.bs.dropdown">
              Training
            </Nav.Link>
            <Nav.Link as={Link} to={"/events"} onClick="hide.bs.dropdown">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to={"/photos"} onClick="hide.bs.dropdown">
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to={"/links"} onClick="hide.bs.dropdown">
              Links
            </Nav.Link>
          </Nav>
          <Nav className="login_nav">
            <ul>
              {isLoggedIn
                ? loggedInNavigationLinks.map((link, idx) => (
                    <Nav.Link
                      key={idx}
                      as={Link}
                      to={link.slug}
                      onClick={link.title === "Logout" && logOut}
                      className="header_link"
                    >
                      <li>{link.title}</li>
                    </Nav.Link>
                  ))
                : loggedOutNavigationLinks.map((link, idx) => (
                    <Nav.Link
                      key={idx}
                      as={Link}
                      to={link.slug}
                      className="header_link"
                    >
                      <li>{link.title}</li>
                    </Nav.Link>
                  ))}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
