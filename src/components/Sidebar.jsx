import React from "react";
import '../pages/Dashboard/DashboardLayout.css'
import { Link } from "react-router-dom";

function Sidebar({ type }) {
  return (
    <div className="sidebar">
      <h3>{type === "hospital" ? "Hospital" : "Pharmacy"} Dashboard</h3>
      <ul>
        {type === "hospital" ? (
          <>
            <li><Link to="/dashboard/hospital/physicians">Physicians</Link></li>
            <li><Link to="/dashboard/hospital/appointments">Appointments</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard/pharmacy/stock">Stock</Link></li>
            <li><Link to="/dashboard/pharmacy/customers">Customers</Link></li>
          </>
        )}
        <li><Link to="/">Home</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
