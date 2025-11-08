import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Find Nearby Pharmacies & Hospitals</h1>
        <p>Book appointments and order medicines online with ease.</p>
        <div className="home-buttons">
          <Link to="/pharmacies" className="btn">Find Pharmacies</Link>
          <Link to="/hospitals" className="btn secondary">Find Hospitals</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
