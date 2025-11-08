import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PharmacyMedicines.css';

function PharmacyMedicines() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState({});
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Simulate fetching pharmacy and its medicines
    const pharmacyData = {
      id,
      name: "Kigali City Pharmacy",
      address: "KN 3 Rd, Kigali",
      phone: "+250 788 123 456",
      image: "/images/pharmacy1.jpg"
    };

    const sampleMedicines = [
      { id: 1, name: "Paracetamol 500mg", price: 1000, stock: 30, image: "/images/med1.jpg" },
      { id: 2, name: "Amoxicillin 250mg", price: 1500, stock: 45, image: "/images/med2.jpg" },
      { id: 3, name: "Ibuprofen 400mg", price: 1200, stock: 50, image: "/images/med3.jpg" },
      { id: 4, name: "Cough Syrup", price: 2500, stock: 15, image: "/images/med4.jpg" },
      { id: 5, name: "Vitamin C 1000mg", price: 1800, stock: 60, image: "/images/med5.jpg" },
      { id: 6, name: "Antiseptic Cream", price: 2000, stock: 20, image: "/images/med6.jpg" },
    ];

    setPharmacy(pharmacyData);
    setMedicines(sampleMedicines);
  }, [id]);

  const handleAddToCart = (medicine) => {
    alert(`${medicine.name} added to cart ✅`);
  };

  return (
    <div className="medicines-container">
      <div className="pharmacy-header">
        <img src={pharmacy.image} alt={pharmacy.name} />
        <div className="pharmacy-details">
          <h2>{pharmacy.name}</h2>
          <p>{pharmacy.address}</p>
          <p>📞 {pharmacy.phone}</p>
          <button className="back-btn" onClick={() => navigate('/pharmacies')}>
            ← Back to Pharmacies
          </button>
        </div>
      </div>

      <h3 className="section-title">Available Medicines</h3>

      <div className="medicines-grid">
        {medicines.map((m) => (
          <div key={m.id} className="medicine-card">
            <img src={m.image} alt={m.name} />
            <div className="medicine-info">
              <h4>{m.name}</h4>
              <p>💰 {m.price} RWF</p>
              <p>Stock: {m.stock}</p>
              <button onClick={() => handleAddToCart(m)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmacyMedicines;
