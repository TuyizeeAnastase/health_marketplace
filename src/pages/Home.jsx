import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Trusted Digital Health Marketplace</h1>
          <p>
            Connect with certified hospitals and pharmacies. 
            Book services and buy medical products easily.
          </p>

          <div className="search-box">
            <input type="text" placeholder="Search hospitals, medicines..." />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* ABOUT + PLATFORM GUIDE */}
      <section className="about-guide">
        <h2>About HealthMarketplace</h2>
        <p className="short-about">
          HealthMarketplace is your one-stop platform for accessing trusted hospitals,
          licensed pharmacies, and medical professionals easily and securely.
        </p>

        <h3>How It Works</h3>
        <div className="steps">

          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Create Account</h4>
            <p>Sign up quickly to start using the platform.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Become a Partner</h4>
            <p>Register your pharmacy or hospital to join our network.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Order Medicines</h4>
            <p>Browse pharmacies and order medicines directly online.</p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h4>Book a Physician</h4>
            <p>Schedule appointments with doctors at trusted hospitals.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;