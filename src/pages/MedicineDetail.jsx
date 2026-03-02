import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Medicines.css";

const medicinesData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: "$5",
    pharmacy: "City Pharmacy",
    description: "Paracetamol is used to relieve pain and reduce fever.",
  },
  {
    id: 2,
    name: "Vitamin C Tablets",
    category: "Vitamins",
    price: "$8",
    pharmacy: "Royal Pharmacy",
    description: "Vitamin C supports the immune system and overall health.",
  },
  {
    id: 3,
    name: "Baby Care Lotion",
    category: "Baby Care",
    price: "$12",
    pharmacy: "Hope Pharmacy",
    description: "Gentle lotion for baby's sensitive skin, moisturizing and safe.",
  },
];

function MedicineDetail() {
  const { id } = useParams();
  const medicine = medicinesData.find((med) => med.id === parseInt(id));

  if (!medicine) return <p>Medicine not found</p>;

  return (
    <div className="medicine-detail-page">
      <h1>{medicine.name}</h1>
      <p><strong>Category:</strong> {medicine.category}</p>
      <p><strong>Pharmacy:</strong> {medicine.pharmacy}</p>
      <p><strong>Price:</strong> {medicine.price}</p>
      <p><strong>Description:</strong> {medicine.description}</p>
      <Link to="/medicines" className="back-btn">← Back to Medicines List</Link>
    </div>
  );
}

export default MedicineDetail;