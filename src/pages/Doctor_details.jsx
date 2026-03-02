import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Doctors.css";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Alice Uwase",
    specialty: "Pediatrics",
    hospital: "City Hospital",
    phone: "+250 788 123 456",
    email: "alice.uwase@hospital.com",
    bio: "Dr. Alice Uwase has 10 years of experience in pediatrics and child healthcare.",
  },
  {
    id: 2,
    name: "Dr. John Mukasa",
    specialty: "Cardiology",
    hospital: "Royal Medical Center",
    phone: "+250 788 987 654",
    email: "john.mukasa@hospital.com",
    bio: "Dr. John Mukasa is an expert cardiologist specializing in heart health and treatment.",
  },
  {
    id: 3,
    name: "Dr. Grace Nsengiyumva",
    specialty: "Dermatology",
    hospital: "Hope Hospital",
    phone: "+250 788 321 000",
    email: "grace.nsengiyumva@hospital.com",
    bio: "Dr. Grace Nsengiyumva is a dermatologist focusing on skin care and treatments.",
  },
];

function DoctorDetail() {
  const { id } = useParams();
  const doctor = doctorsData.find((doc) => doc.id === parseInt(id));

  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className="doctor-detail-page">
      <h1>{doctor.name}</h1>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Hospital:</strong> {doctor.hospital}</p>
      <p><strong>Phone:</strong> {doctor.phone}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Bio:</strong> {doctor.bio}</p>
      <Link to="/doctors" className="back-btn">← Back to Doctors List</Link>
    </div>
  );
}

export default DoctorDetail;