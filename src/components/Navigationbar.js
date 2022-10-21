import {Nav, Navbar, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom"
import React from 'react';

const Navigationbar = () => {
    return (
        <Navbar collapseOnSelect expand = "sm" bg = "dark" variant = "dark">
            <Navbar.Toggle aria-controls = "navbarScroll" data-bs-target = "#navbarScroll" />

            <Navbar.Collapse id = "navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as = {Link} to = "">Home</NavLink>
                    <NavLink eventKey="3" as = {Link} to = "/about">About</NavLink>
                    <NavLink eventKey="2" as = {Link} to = "/community">Community</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default Navigationbar; 