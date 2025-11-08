import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "./DashboardLayout.css";

function HospitalDashboard() {
  const [physicians, setPhysicians] = useState([
    { id: 1, name: "Dr. Alice Karekezi", specialization: "Cardiologist" },
    { id: 2, name: "Dr. John Ndayishimiye", specialization: "Pediatrician" },
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Emmy Mugisha", doctor: "Dr. Alice Karekezi", date: "2025-11-10" },
    { id: 2, patient: "Sandra Uwase", doctor: "Dr. John Ndayishimiye", date: "2025-11-11" },
  ]);

  return (
    <div className="dashboard-container">
      <Sidebar type="hospital" />
      <div className="dashboard-content">
        <Topbar owner="Hospital Admin" />

        <div className="content-area">
          <h3>Physicians</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {physicians.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "40px" }}>Upcoming Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patient}</td>
                  <td>{a.doctor}</td>
                  <td>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;
