import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./pure_logo.png";
import {Link} from "react-router-dom";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand><Link to="../Home">NeRF</Link></Navbar.Brand>
        {/* <Navbar.Brand><Link to="../Home"><img src={logo} id="navLogo"/></Link></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="../About">About</Link></Nav.Link>
            <Nav.Link><Link to="../Community">Community</Link></Nav.Link>
          </Nav>
          <Nav>
            <Button variant="btn btn-success" style={{marginRight:"10px",color:"white"}}><Link to="../Signup">Signup</Link></Button>
            <Button variant="btn btn-warning"><Link to="../Login">Login</Link></Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
