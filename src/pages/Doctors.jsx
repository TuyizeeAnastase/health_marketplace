import React from "react";
import { Link } from "react-router-dom";
import "./Doctors.css";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Alice Uwase",
    specialty: "Pediatrics",
    hospital: "City Hospital",
    phone: "+250 788 123 456",
    email: "alice.uwase@hospital.com",
  },
  {
    id: 2,
    name: "Dr. John Mukasa",
    specialty: "Cardiology",
    hospital: "Royal Medical Center",
    phone: "+250 788 987 654",
    email: "john.mukasa@hospital.com",
  },
  {
    id: 3,
    name: "Dr. Grace Nsengiyumva",
    specialty: "Dermatology",
    hospital: "Hope Hospital",
    phone: "+250 788 321 000",
    email: "grace.nsengiyumva@hospital.com",
  },
];

function DoctorsList() {
  return (
    <div className="doctors-page">
      <h1>Our Doctors</h1>
      <div className="doctors-list">
        {doctorsData.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <h3>{doc.name}</h3>
            <p><strong>Specialty:</strong> {doc.specialty}</p>
            <p><strong>Hospital:</strong> {doc.hospital}</p>
            <Link to={`/doctors/${doc.id}`} className="view-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;