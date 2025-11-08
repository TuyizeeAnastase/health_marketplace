import React from "react";
import '../pages/Dashboard/DashboardLayout.css'

function Topbar({ owner }) {
  return (
    <div className="topbar">
      <h2>Welcome, {owner}</h2>
      <button>Logout</button>
    </div>
  );
}

export default Topbar;
