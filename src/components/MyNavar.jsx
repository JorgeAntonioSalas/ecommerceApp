import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const MyNavar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" href="#home">
            HOME
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Account <i className="fa-solid fa-user"></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites">
                Purchase History  <i className="fa-solid fa-clock-rotate-left"></i>
              </Nav.Link>
              <Nav.Link onClick={handleShow}>
                Cart <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
              <Nav.Link onClick={logout}>
                Exit <i className="fa-solid fa-right-from-bracket"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default MyNavar;
