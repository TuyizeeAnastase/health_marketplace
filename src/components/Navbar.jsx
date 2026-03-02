import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [hospitalOpen, setHospitalOpen] = useState(false);
  const [pharmacyOpen, setPharmacyOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">HealthMarketplace</Link>
        </div>

        <nav className="nav-links">

          <NavLink to="/" end>Home</NavLink>

          {/* Hospitals Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setHospitalOpen(true)}
            onMouseLeave={() => setHospitalOpen(false)}
          >
            <span className="dropbtn">Hospitals ▾</span>
            {hospitalOpen && (
              <div className="dropdown-content">
                <Link to="/hospitals">Pediatrics</Link>
                <Link to="/hospitals/cardiology">Cardiology</Link>
                <Link to="/hospitals/maternity">Maternity</Link>
                <Link to="/hospitals/dermatology">Dermatology</Link>
              </div>
            )}
          </div>

          {/* Pharmacy Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setPharmacyOpen(true)}
            onMouseLeave={() => setPharmacyOpen(false)}
          >
            <span className="dropbtn">Pharmacy ▾</span>
            {pharmacyOpen && (
              <div className="dropdown-content">
                <Link to="/pharmacies/pain-relief">Pain Relief</Link>
                <Link to="/pharmacies/vitamins">Vitamins</Link>
                <Link to="/pharmacies/baby-care">Baby Care</Link>
                <Link to="/pharmacies/equipment">Medical Equipment</Link>
              </div>
            )}
          </div>

          <NavLink to="/doctors">Doctors</NavLink>
          <NavLink to="/medicines">Medicines</NavLink>
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