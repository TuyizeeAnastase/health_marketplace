import React, { useState } from "react";
import "./HospitalDashboard.css";

function HospitalDashboard() {
  const [hospital] = useState({
    name: "City Hospital",
    contact: "+250 788 123 456",
    email: "info@cityhospital.com",
    address: "123 Main Street, Kigali, Rwanda",
    featuredPatient: "John Doe",
  });

  const [departments] = useState([
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "General Surgery",
    "Oncology",
  ]);

  const [doctors] = useState([
    { id: 1, name: "Dr. Smith", department: "Cardiology", available: true, email: "smith@cityhospital.com", phone: "+250 788 111 222" },
    { id: 2, name: "Dr. Adams", department: "Neurology", available: false, email: "adams@cityhospital.com", phone: "+250 788 333 444" },
  ]);

  const [patients] = useState([
    { id: 1, name: "John Doe", bookingDate: "12 March 2026", doctor: "Dr. Smith", department: "Cardiology", status: "Checked In" },
    { id: 2, name: "Jane Doe", bookingDate: "14 March 2026", doctor: "Dr. Adams", department: "Neurology", status: "Upcoming" },
  ]);

  return (
    <div className="hospital-dashboard">
      <header className="dashboard-header">
        <h1>{hospital.name} Dashboard</h1>
      </header>

      {/* Hospital Info & Departments */}
      <div className="grid">
        <div className="card">
          <h2>Hospital Info</h2>
          <p><strong>Contact:</strong> {hospital.contact}</p>
          <p><strong>Email:</strong> {hospital.email}</p>
          <p><strong>Address:</strong> {hospital.address}</p>
          <p><strong>Featured Patient:</strong> {hospital.featuredPatient}</p>
        </div>

        <div className="card">
          <h2>Departments</h2>
          <ul>
            {departments.map((dept, idx) => <li key={idx}>{dept}</li>)}
          </ul>
        </div>
      </div>

      {/* Available Doctors Table */}
      <div className="table-container">
        <h2>Available Doctors</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.department}</td>
                <td>{doc.email}</td>
                <td>{doc.phone}</td>
                <td className={doc.available ? "status-available" : "status-unavailable"}>
                  {doc.available ? "Available" : "Not Available"}
                </td>
                <td><button className="btn-small">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booked Patients Table */}
      <div className="table-container">
        <h2>Booked Patients</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.doctor}</td>
                <td>{p.department}</td>
                <td>{p.bookingDate}</td>
                <td className={p.status === "Checked In" ? "status-checkedin" : "status-upcoming"}>
                  {p.status}
                </td>
                <td><button className="btn-small">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HospitalDashboard;