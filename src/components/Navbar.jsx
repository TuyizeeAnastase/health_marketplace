import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">HealthMarketplace</Link>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/pharmacies">Pharmacies</NavLink>
          <NavLink to="/hospitals">Hospitals</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
          <NavLink to="/medicines">Medicines</NavLink>
        </nav>

        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
