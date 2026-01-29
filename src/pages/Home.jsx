import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import healthcareImg from '../images/medicine-healthcare.jpg';
import insurance from '../images/insurance.jpg'
import medecine from '../images/medicine-online.jpg'
import support from '../images/support.jpg'
import book from '../images/Book_Appointment.png'

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Nearby Pharmacies & Hospitals</h1>
          <p>Book appointments, order medicines, and manage health online with ease.</p>
          <div className="home-buttons">
            <Link to="/pharmacies" className="btn">Find Pharmacies</Link>
            <Link to="/hospitals" className="btn secondary">Find Hospitals</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder for illustration */}
          <img src={healthcareImg} alt="Healthcare" />
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <input type="text" placeholder="Search for hospitals or pharmacies..." />
        <button className="btn search-btn">Search</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Use Our Marketplace?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={medecine} alt="Order Medicine" />
            <h3>Order Medicines</h3>
            <p>Get your prescribed medicines delivered to your doorstep quickly.</p>
          </div>
          <div className="feature-card">
            <img src={book} alt="Book Doctor" />
            <h3>Book Doctors</h3>
            <p>Schedule appointments with certified doctors from top hospitals.</p>
          </div>
          <div className="feature-card">
            <img src={insurance} alt="Insurance" />
            <h3>Insurance Services</h3>
            <p>Access insurance providers and manage your claims online.</p>
          </div>
          <div className="feature-card">
            <img src={support} alt="Support" />
            <h3>24/7 Support</h3>
            <p>Our team is available anytime to help you with your health needs.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Start managing your health today</h2>
        <Link to="/register" className="btn btn-cta">Get Started</Link>
      </section>
    </div>
  );
}

export default Home;
