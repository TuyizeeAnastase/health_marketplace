import React from "react";
import { Link } from "react-router-dom";
import "./Medicines.css";

const medicinesData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: "$5",
    pharmacy: "City Pharmacy",
  },
  {
    id: 2,
    name: "Vitamin C Tablets",
    category: "Vitamins",
    price: "$8",
    pharmacy: "Royal Pharmacy",
  },
  {
    id: 3,
    name: "Baby Care Lotion",
    category: "Baby Care",
    price: "$12",
    pharmacy: "Hope Pharmacy",
  },
];

function MedicinesList() {
  return (
    <div className="medicines-page">
      <h1>Available Medicines</h1>
      <div className="medicines-list">
        {medicinesData.map((med) => (
          <div key={med.id} className="medicine-card">
            <h3>{med.name}</h3>
            <p><strong>Category:</strong> {med.category}</p>
            <p><strong>Pharmacy:</strong> {med.pharmacy}</p>
            <p><strong>Price:</strong> {med.price}</p>
            <Link to={`/medicines/${med.id}`} className="view-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicinesList;