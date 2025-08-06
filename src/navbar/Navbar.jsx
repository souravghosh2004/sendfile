import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import appLogo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo">
          <img src={appLogo} alt="Logo" className="logo-img" />
        </NavLink>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
