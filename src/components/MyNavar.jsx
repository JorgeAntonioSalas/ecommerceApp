import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavar = () => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link}to="/" >News App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            <Nav.Link as={Link} to="/favorites" >Favorites</Nav.Link>
            <Nav.Link >Favorites (SIDE BAR)</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavar;
