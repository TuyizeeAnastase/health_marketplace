import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">HealthMarketplace</Link>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/hospitals"  onClick={() => setMenuOpen(false)}>Hospitals</NavLink>
          <NavLink to="/pharmacies" onClick={() => setMenuOpen(false)}>Pharmacies</NavLink>
          <NavLink to="/doctors"    onClick={() => setMenuOpen(false)}>Doctors</NavLink>
          <NavLink to="/medicines"  onClick={() => setMenuOpen(false)}>Medicines</NavLink>
        </nav>

        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">
            Login / Become a Partner
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;