import React, { useState, useEffect } from 'react';
import './PharmacyList.css';

const NearbyPharmacies = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Sample pharmacy data (10 entries)
    const samplePharmacies = [
      {
        id: 1,
        name: "Kigali City Pharmacy",
        image: "/images/pharmacy1.jpg",
        address: "KN 3 Rd, Kigali",
        distance: "0.8 km",
        phone: "+250 788 123 456"
      },
      {
        id: 2,
        name: "Nyamirambo Health Pharmacy",
        image: "/images/pharmacy2.jpg",
        address: "NR 15 St, Kigali",
        distance: "1.2 km",
        phone: "+250 781 222 333"
      },
      {
        id: 3,
        name: "Remera Medical Store",
        image: "/images/pharmacy3.jpg",
        address: "KG 17 Ave, Remera",
        distance: "2.4 km",
        phone: "+250 789 654 321"
      },
      {
        id: 4,
        name: "CHIC Pharmacy",
        image: "/images/pharmacy4.jpg",
        address: "KN 2 Ave, Nyarugenge",
        distance: "0.6 km",
        phone: "+250 782 110 999"
      },
      {
        id: 5,
        name: "Kimironko Drugstore",
        image: "/images/pharmacy5.jpg",
        address: "KK 31 Ave, Kimironko",
        distance: "3.1 km",
        phone: "+250 788 888 777"
      },
      {
        id: 6,
        name: "La Nouvelle Pharmacy",
        image: "/images/pharmacy6.jpg",
        address: "KG 7 Ave, Kacyiru",
        distance: "1.9 km",
        phone: "+250 780 444 555"
      },
      {
        id: 7,
        name: "Kanombe Health Point",
        image: "/images/pharmacy7.jpg",
        address: "KK 25 Ave, Kanombe",
        distance: "5.4 km",
        phone: "+250 785 777 888"
      },
      {
        id: 8,
        name: "Gikondo Pharmacy",
        image: "/images/pharmacy8.jpg",
        address: "KK 11 Rd, Gikondo",
        distance: "2.2 km",
        phone: "+250 781 900 234"
      },
      {
        id: 9,
        name: "Rwanda Med Plus",
        image: "/images/pharmacy9.jpg",
        address: "KN 4 Ave, Kigali",
        distance: "1.5 km",
        phone: "+250 788 111 999"
      },
      {
        id: 10,
        name: "Green Life Pharmacy",
        image: "/images/pharmacy10.jpg",
        address: "KG 9 Rd, Niboye",
        distance: "4.3 km",
        phone: "+250 780 200 700"
      }
    ];

    setPharmacies(samplePharmacies);

    // Get user's location (optional demo)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      });
    }
  }, []);

  const handlePharmacyClick = (pharmacy) => {
    alert(`You clicked ${pharmacy.name}. Redirect to medicines page...`);
  };

  return (
    <div className="pharmacy-container">
      <h2>Nearby Pharmacies</h2>
      {userLocation ? (
        <p className="user-location">
          Your location detected ✅ (lat: {userLocation.lat.toFixed(4)}, lng: {userLocation.lng.toFixed(4)})
        </p>
      ) : (
        <p className="user-location">Detecting your location...</p>
      )}

      <div className="pharmacy-grid">
        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="pharmacy-card"
            onClick={() => handlePharmacyClick(pharmacy)}
          >
            <img src={pharmacy.image} alt={pharmacy.name} />
            <div className="pharmacy-info">
              <h3>{pharmacy.name}</h3>
              <p>{pharmacy.address}</p>
              <p className="distance">📍 {pharmacy.distance}</p>
              <p className="phone">📞 {pharmacy.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPharmacies;
