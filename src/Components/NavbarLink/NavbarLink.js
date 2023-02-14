import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../src/pure_logo.png";

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <img src={logo} className="d-inline-block align-top" alt="nerflogo" width="50" height="50"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className = "text-white" href="#home">About</Nav.Link>
            <Nav.Link className = "text-white" href="#link" >Community</Nav.Link>
            <Nav.Link className = "text-white" href="#login">Login</Nav.Link>
            <Nav.Link type = "button" className="btn btn-warning m3-margin" href="#signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
