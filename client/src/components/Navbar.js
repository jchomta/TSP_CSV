import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
} from './NavbarElements';
import './Navbar.css'
  
const Navbar = () => {
  return (
      <Nav>
        <NavMenu>
            <NavLink to='/'>
                <p>Home</p>
            </NavLink>
            <NavLink to='/system_diagnostic'>
                <p>System Diagnostic Report</p>
            </NavLink>
            <NavLink to='/inactive_TSP'>
                <p>Inactive TSP List</p>
            </NavLink>
            <NavLink to='/scrap'>
                <p>Scrap Buses</p>
            </NavLink>
        </NavMenu>
      </Nav>
  );
};
  
export default Navbar;