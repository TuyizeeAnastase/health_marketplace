import React, { useState, useEffect } from 'react';
import './PharmacyList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3500/api/v1';


const NearbyPharmacies = () => {
  const [userLocation, setUserLocation]   = useState(null);
  const [pharmacies, setPharmacies]       = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [locationName, setLocationName] = useState("Detecting your location...");
 const navigate = useNavigate();
  useEffect(() => {
    // ── Fetch pharmacies from API ───────────────────────────
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/pharmacies`);

        // Support both { data: { pharmacies: [] } } and { data: [] }
        const data = res.data?.data?.pharmacies || res.data?.data || res.data || [];

        setPharmacies(data);
      } catch (err) {
        console.error('fetchPharmacies error:', err);
        setError('Failed to load pharmacies. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setUserLocation({ lat: latitude, lng: longitude });

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        // Extract readable address parts
        const city    = data.address?.city || data.address?.town || data.address?.village || "";
        const suburb  = data.address?.suburb || data.address?.neighbourhood || "";
        const country = data.address?.country || "";

        setLocationName(`${suburb ? suburb + ", " : ""}${city}${country ? ", " + country : ""}`);
      } catch (err) {
        setLocationName("Location detected");
      }
    });
  }

    fetchPharmacies();

    // ── Detect user location ──────────────────────────────────
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  const handlePharmacyClick = (pharmacy) => {
    navigate(`/pharmacy/${pharmacy.id}`);
  };

  return (
    <div className="pharmacy-container">
      <h2>Nearby Pharmacies</h2>

      <p className="user-location">
  📍    {locationName}
      </p>

      {/* ── Loading / Error states ── */}
      {loading && <p className="user-location">Loading pharmacies...</p>}
      {error   && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      <div className="pharmacy-grid">
        {!loading && pharmacies.length === 0 && (
          <p>No pharmacies found.</p>
        )}

        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="pharmacy-card"
            onClick={() => handlePharmacyClick(pharmacy)}
          >
            <img
              src={pharmacy.image || '/images/pharmacy1.jpg'}
              alt={pharmacy.name}
            />
            <div className="pharmacy-info">
              <h3>{pharmacy.name}</h3>
              <p>{pharmacy.address}</p>
              {pharmacy.distance && (
                <p className="distance">📍 {pharmacy.distance}</p>
              )}
              <p className="phone">📞 {pharmacy.phone}</p>

              {/* Accepted insurances */}
              {pharmacy.insurances?.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {pharmacy.insurances.slice(0, 3).map(ins => (
                    <span
                      key={ins.id}
                      style={{
                        fontSize: 11,
                        background: '#e3f2fd',
                        color: '#1565c0',
                        borderRadius: 4,
                        padding: '2px 6px',
                      }}
                    >
                      {ins.name}
                    </span>
                  ))}
                  {pharmacy.insurances.length > 3 && (
                    <span style={{ fontSize: 11, color: '#888' }}>
                      +{pharmacy.insurances.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Available medicines count */}
              {pharmacy.medicines?.length > 0 && (
                <p style={{ fontSize: 12, color: '#2e7d32', marginTop: 4 }}>
                  💊 {pharmacy.medicines.length} medicines available
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPharmacies;