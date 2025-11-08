import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">MediConnect</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pharmacies">Pharmacies</Link></li>
        <li><Link to="/hospitals">Hospitals</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
