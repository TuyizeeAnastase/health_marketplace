import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO/BANNER */}
      <section className="about-hero">
        <h1>Welcome to HealthMarketplace</h1>
        <p>
          Your trusted platform for accessing hospitals, pharmacies, and healthcare services.
        </p>
      </section>

      {/* PLATFORM GUIDE */}
      <section className="platform-guide">
        <h2>How Our Platform Works</h2>
        <p>Follow these simple steps to get started:</p>

        <div className="steps">

          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>
              Sign up using your phone number and basic information to start using our platform.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Become a Partner</h3>
            <p>
              Register your hospital or pharmacy to join our trusted network and reach more patients.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Order Medicines</h3>
            <p>
              Browse pharmacies and order medicines directly from licensed providers.
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Book a Physician</h3>
            <p>
              Schedule appointments with doctors in hospitals anytime and anywhere.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default About;