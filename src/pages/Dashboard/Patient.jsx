import React, { useState, useRef } from "react";
import "./PatientDashboard.css";

// Reusable FullWidthSlider component
function FullWidthSlider({ items, renderCard }) {
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
  };

  return (
    <section className="full-slider-section">
      <div className="full-slider" ref={sliderRef}>
        {items.map((item, index) => (
          <div key={index} className="full-slide">
            {renderCard(item)}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="scroll-buttons">
          <button className="scroll-btn left" onClick={scrollLeft}>◀</button>
          <button className="scroll-btn right" onClick={scrollRight}>▶</button>
        </div>
      )}
    </section>
  );
}

function PatientDashboard() {
  const [patient] = useState({
    name: "John Doe",
    email: "john@email.com",
    phone: "+250 788 000 000",
    blood: "O+",
  });

  const [appointments] = useState([
    {
      id: 1,
      hospital: "City Hospital",
      doctor: "Dr. Smith",
      date: "12 March 2026",
      time: "10:30 AM",
      status: "Completed",
      healthCondition: "Diabetes",
      lastBought: "01 March 2026",
      lastRefill: "15 March 2026",
      refillDate: "20 March 2026",
      pharmacy: "Kigali Pharmacy",
      pharmacyPhone: "+250 788 111 222",
    },
    {
      id: 2,
      hospital: "Hope Clinic",
      doctor: "Dr. Adams",
      date: "25 March 2026",
      time: "02:00 PM",
      status: "Upcoming",
      healthCondition: "Hypertension",
      lastBought: "10 March 2026",
      lastRefill: "20 March 2026",
      refillDate: "05 April 2026",
      pharmacy: "CityMed Pharmacy",
      pharmacyPhone: "+250 788 333 444",
    },
    {
      id: 3,
      hospital: "Hope Clinic",
      doctor: "Dr. Johnson",
      date: "02 April 2026",
      time: "11:00 AM",
      status: "Upcoming",
      healthCondition: "Asthma",
      lastBought: "15 March 2026",
      lastRefill: "22 March 2026",
      refillDate: "10 April 2026",
      pharmacy: "CityMed Pharmacy",
      pharmacyPhone: "+250 788 333 444",
    },
  ]);

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Metformin 500mg",
      lastBought: "01 March 2026",
      lastRefill: "15 March 2026",
      nextRefill: "20 March 2026",
      status: "Due in 3 days",
      reminder: true,
    },
    {
      id: 2,
      name: "Amlodipine 10mg",
      lastBought: "10 March 2026",
      lastRefill: "20 March 2026",
      nextRefill: "05 April 2026",
      status: "Upcoming",
      reminder: false,
    },
    {
      id: 3,
      name: "Salbutamol 100mcg",
      lastBought: "12 March 2026",
      lastRefill: "18 March 2026",
      nextRefill: "25 March 2026",
      status: "Upcoming",
      reminder: true,
    },
  ]);

  const toggleReminder = (id) => {
    setMedicines(
      medicines.map((med) =>
        med.id === id ? { ...med, reminder: !med.reminder } : med
      )
    );
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {patient.name}</h1>
          <p>Patient Dashboard</p>
        </div>
        <button className="btn">Edit Profile</button>
      </header>

      {/* Top: Personal Info + Health Conditions */}
      <div className="grid">
        <div className="card">
          <h2>Personal Information</h2>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Blood Group:</strong> {patient.blood}</p>
        </div>

        <div className="card">
          <h2>Health Conditions</h2>
          <ul>
            <li>Diabetes</li>
            <li>Hypertension</li>
          </ul>
        </div>
      </div>

      {/* Booking History Slider */}
      <FullWidthSlider
        items={appointments}
        renderCard={(appt) => (
          <div className="slide-content">
            <div className="card-header">
              <strong>{appt.date}</strong> <span>{appt.time}</span>
            </div>
            <div className={`status ${appt.status.toLowerCase()}`}>{appt.status}</div>
            <p><strong>Hospital:</strong> {appt.hospital}</p>
            <p><strong>Doctor:</strong> {appt.doctor}</p>
            <p><strong>Health:</strong> {appt.healthCondition}</p>
            <div className="card-flex">
              <span><strong>Last Bought:</strong> {appt.lastBought}</span>
              <span><strong>Last Refill:</strong> {appt.lastRefill}</span>
              <span><strong>Next Refill:</strong> {appt.refillDate}</span>
            </div>
            <p>
              <strong>Pharmacy:</strong> {appt.pharmacy} <br/>
              <strong>Phone:</strong> {appt.pharmacyPhone}
            </p>
          </div>
        )}
      />

      {/* Medicine Refills Slider */}
      <FullWidthSlider
        items={medicines}
        renderCard={(med) => (
          <div className="slide-content">
            <h3>{med.name}</h3>
            <div className="card-flex">
              <span><strong>Last Bought:</strong> {med.lastBought}</span>
              <span><strong>Last Refill:</strong> {med.lastRefill}</span>
              <span><strong>Next Refill:</strong> {med.nextRefill}</span>
            </div>
            <p>{med.status}</p>
            <label className="switch">
              <input type="checkbox" checked={med.reminder} onChange={() => toggleReminder(med.id)} />
              <span className="slider"></span>
            </label>
            <span className="reminder-text">
              {med.reminder ? "Reminder On" : "Reminder Off"}
            </span>
          </div>
        )}
      />
    </div>
  );
}

export default PatientDashboard;