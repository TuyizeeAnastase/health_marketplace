import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>HealthMarketplace</h3>
          <p>Connecting you to trusted hospitals, pharmacies, and doctors in one place.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#">Pharmacies</Link></li>
            <li><Link to="/#">Hospitals</Link></li>
            <li><Link to="/#">Doctors</Link></li>
            <li><Link to="/#">Medicines</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@healthmarketplace.com</p>
          <p>Phone: +250 788 000 000</p>
          <div className="social-icons">
            <a href="/#"><i className="fab fa-facebook-f"></i></a>
            <a href="/#"><i className="fab fa-twitter"></i></a>
            <a href="/#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HealthMarketplace. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
