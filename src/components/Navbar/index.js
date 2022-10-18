import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";


const Navbar = () => {
    return (
      <>
        <Nav class="navbar navbar-expand-lg navbar-light bg-light">
          <NavMenu>
          <NavLink to="" activeStyle>
              Home
            </NavLink>
            <NavLink to="/about" activeStyle>
              About NerF
            </NavLink>
            <NavLink to="/community" activeStyle>
              Community
            </NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  };
  
  export default Navbar;
