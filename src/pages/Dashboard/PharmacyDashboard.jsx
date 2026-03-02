import React, { useState } from "react";
import "./PharmacyDashboard.css";

function PharmacyDashboard() {
  const [pharmacy] = useState({
    name: "CityMed Pharmacy",
    contact: "+250 788 333 444",
    email: "pharmacy@citymed.com",
    address: "456 Main Street, Kigali, Rwanda",
  });

  const [stocks] = useState([
    { id: 1, name: "Metformin 500mg", quantity: 120 },
    { id: 2, name: "Amlodipine 10mg", quantity: 80 },
    { id: 3, name: "Salbutamol 100mcg", quantity: 50 },
  ]);

  const [orders] = useState([
    { id: 1, name: "Metformin 500mg", orderedDate: "01 March 2026", delivered: true },
    { id: 2, name: "Amlodipine 10mg", orderedDate: "10 March 2026", delivered: false },
  ]);

  const [refills] = useState([
    { id: 1, patient: "John Doe", medicine: "Metformin 500mg", refillDate: "20 March 2026" },
    { id: 2, patient: "Jane Doe", medicine: "Amlodipine 10mg", refillDate: "05 April 2026" },
  ]);

  return (
    <div className="pharmacy-dashboard">
      <header className="dashboard-header">
        <h1>{pharmacy.name} Dashboard</h1>
      </header>

      {/* Pharmacy Info */}
      <div className="grid">
        <div className="card">
          <h2>Pharmacy Info</h2>
          <p><strong>Contact:</strong> {pharmacy.contact}</p>
          <p><strong>Email:</strong> {pharmacy.email}</p>
          <p><strong>Address:</strong> {pharmacy.address}</p>
        </div>
      </div>

      {/* Available Stocks Table */}
      <div className="table-container">
        <h2>Available Stocks</h2>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.quantity}</td>
                <td><button className="btn-small">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ordering History Table */}
      <div className="table-container">
        <h2>Ordering History</h2>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Ordered Date</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.orderedDate}</td>
                <td className={o.delivered ? "status-delivered" : "status-pending"}>
                  {o.delivered ? "Delivered" : "Pending"}
                </td>
                <td><button className="btn-small">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upcoming Refills Table */}
      <div className="table-container">
        <h2>Upcoming Refills</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Medicine</th>
              <th>Refill Date</th>
            </tr>
          </thead>
          <tbody>
            {refills.map((r) => (
              <tr key={r.id}>
                <td>{r.patient}</td>
                <td>{r.medicine}</td>
                <td>{r.refillDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PharmacyDashboard;