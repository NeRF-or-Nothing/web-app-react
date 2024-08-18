/**
 * @file NavbarLink.tsx
 * @desc This component allows easy navigation between different pages of the application.
 */
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../Assets/pure_logo.png';
import { AuthContext } from '../../Context/AuthContext';


/**
 * Dynamically renders the navigation bar based on the user's authentication status.
 * @returns The navigation bar component.
 */
function NavBar(): JSX.Element {
  const { isAuthenticated, token, username, logout } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="py-2">
      <Container>
        <Navbar.Brand as={Link} to="../Home" className="d-flex align-items-center">
          <img
            src={logo}
            id="navLogo"
            alt="Logo"
            className="me-2"
            style={{ height: '40px', width: 'auto' }}
          />
          <span>NeRF-or-Nothing</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="../About" className="px-2">
              <Button variant="outline-light" className="text-light w-100">About</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="../Scene/UploadASplatScene" className="px-2">
              <Button variant="outline-light" className="text-light w-100">Render Local Scene</Button>
            </Nav.Link>
            {/* <Nav.Link as={Link} to="../Community" className="px-2">
              <Button variant="link" className="text-light p-0">Community</Button>
            </Nav.Link> (uncomment if functionality implemented) */}
          </Nav>
          <Nav className="align-items-center">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Logged in as: {username}
                </Navbar.Text>
                <Nav.Link as={Link} to="/History" className="px-2">
                  <Button variant="outline-light" className="w-100">My Scenes</Button>
                </Nav.Link>
                <Nav.Link className="px-2">
                  <Button variant="outline-light" onClick={logout} className="w-100">
                    Logout
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="../Signup" className="px-2">
                  <Button variant="success" className="w-100">Signup</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="../Login" className="px-2">
                  <Button variant="warning" className="w-100">Login</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;