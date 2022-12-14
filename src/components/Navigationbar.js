import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

// The is a Bavigation from Bootstrap, nad it's used for users to navigate the three different pages that
// the website have. 

const Navigationbar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "10" }}
    >
      <img
        src="./pure_logo.png"
        alt="N logo"
        style={{ width: 75, height: 75 }}
      />
      <Navbar.Collapse id="navbarScroll">
        <div class="container">
          <Nav>
            <NavLink eventKey="1" as={Link} to="">
              Home
            </NavLink>
            <NavLink eventKey="3" as={Link} to="/about">
              About
            </NavLink>
            <NavLink eventKey="2" as={Link} to="/community">
              Community
            </NavLink>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
