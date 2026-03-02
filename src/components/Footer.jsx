import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section brand">
          <h3>HealthMarketplace</h3>
          <p>
            Connecting you to trusted hospitals, pharmacies, doctors,
            and quality medicines — all in one digital platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pharmacies">Pharmacies</Link></li>
            <li><Link to="/hospitals">Hospitals</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/medicines">Medicines</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/hospitals/pediatrics">Pediatrics</Link></li>
            <li><Link to="/hospitals/cardiology">Cardiology</Link></li>
            <li><Link to="/pharmacies/vitamins">Vitamins</Link></li>
            <li><Link to="/pharmacies/equipment">Medical Equipment</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@healthmarketplace.com</p>
          <p>Phone: +250 788 000 000</p>

          <div className="newsletter">
            <input type="email" placeholder="Subscribe to newsletter" />
            <button>Subscribe</button>
          </div>

          <div className="social-icons">
            <a href="/#">Facebook</a>
            <a href="/#">Twitter</a>
            <a href="/#">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} HealthMarketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;