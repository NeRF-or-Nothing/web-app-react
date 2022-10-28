import {Nav, Navbar, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom"
import React from 'react';
import logo from "./logo_nerf_fine.svg"; 

const Navigationbar = () => {
    return (
        <Navbar collapseOnSelect expand = "lg" bg = "dark" variant = "dark" >

        <a href="#" class="pull-left"><img src= {logo}/></a> 

            <Navbar.Collapse id = "navbarScroll">
            <div class="container">
                <Nav>
                    <NavLink eventKey="1"  as = {Link} to = "">Home</NavLink>
                    <NavLink eventKey="3" as = {Link} to = "/about">About</NavLink>
                    <NavLink eventKey="2" as = {Link} to = "/community">Community</NavLink>
                </Nav>
            </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigationbar; 