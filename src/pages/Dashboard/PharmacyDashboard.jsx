import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "./DashboardLayout.css";

function PharmacyDashboard() {
  const [stock, setStock] = useState([
    { id: 1, name: "Paracetamol 500mg", quantity: 120, price: "RWF 1000" },
    { id: 2, name: "Amoxicillin 250mg", quantity: 80, price: "RWF 1500" },
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: "Jean Claude", visits: 12 },
    { id: 2, name: "Alice Uwamahoro", visits: 9 },
  ]);

  return (
    <div className="dashboard-container">
      <Sidebar type="pharmacy" />
      <div className="dashboard-content">
        <Topbar owner="Pharmacy Owner" />

        <div className="content-area">
          <h3>Medicine Stock</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.quantity}</td>
                  <td>{s.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "40px" }}>Frequent Customers</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Visits</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDashboard;
