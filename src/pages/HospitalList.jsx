import React, { useEffect, useState } from "react";
import "./Hospitals.css";
import axios from "axios";

const API_BASE = "http://localhost:3500/api/v1";

function NearbyHospitals() {
  const [userLocation, setUserLocation]           = useState(null);
  const [hospitals, setHospitals]                 = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital]   = useState(null);
  const [selectedDoctor, setSelectedDoctor]       = useState(null);
  const [showModal, setShowModal]                 = useState(false);
  const [categoryFilter, setCategoryFilter]       = useState("All");
  const [categories, setCategories]               = useState(["All"]);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState("");
  const [locationName, setLocationName]           = useState("Detecting your location...");

  // ── Booking form state ────────────────────────────────────
  const [appointmentData, setAppointmentData] = useState({
    patientName: "",
    phone:       "",
    date:        "",
    time:        "",
    condition:   "",
    service:     "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError,   setBookingError]   = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // ── Fetch hospitals + detect location ────────────────────
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res  = await axios.get(`${API_BASE}/hospitals`);
        const data = res.data?.data?.hospitals || res.data?.data || res.data || [];
        setHospitals(data);
        setFilteredHospitals(data);
        const allServices = data.flatMap(h => h.services || []);
        const unique = ["All", ...new Set(allServices.map(s => s.name))];
        setCategories(unique);
      } catch (err) {
        console.error("fetchHospitals error:", err);
        setError("Failed to load hospitals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();

    // Detect location and reverse geocode
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        try {
          const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city    = data.address?.city || data.address?.town || data.address?.village || "";
          const suburb  = data.address?.suburb || data.address?.neighbourhood || "";
          const country = data.address?.country || "";
          setLocationName(`${suburb ? suburb + ", " : ""}${city}${country ? ", " + country : ""}`);
        } catch {
          setLocationName("Location detected");
        }
      });
    }
  }, []);

  // ── Filter by service ─────────────────────────────────────
  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    if (category === "All") {
      setFilteredHospitals(hospitals);
    } else {
      setFilteredHospitals(hospitals.filter(h => h.services?.some(s => s.name === category)));
    }
  };

  // ── Open booking modal ────────────────────────────────────
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentData({ patientName: "", phone: "", date: "", time: "", condition: "", service: "" });
    setBookingError("");
    setBookingSuccess(false);
    setShowModal(true);
  };

  // ── Submit booking to API ─────────────────────────────────
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingLoading(true);

    try {
      await axios.post(`${API_BASE}/bookings`, {
        patientName:  appointmentData.patientName,
        phone:        appointmentData.phone,
        date:         appointmentData.date,
        time:         appointmentData.time,
        condition:    appointmentData.condition,
        service:      appointmentData.service,
        doctorId:     selectedDoctor.id,
        hospitalId:   selectedHospital.id,
        hospitalName: selectedHospital.name,
        doctorName:   selectedDoctor.name,
      });

      setBookingSuccess(true);

      // Auto close after 2.5s
      setTimeout(() => {
        setShowModal(false);
        setBookingSuccess(false);
        setAppointmentData({ patientName: "", phone: "", date: "", time: "", condition: "", service: "" });
      }, 2500);

    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to book appointment. Please try again.";
      setBookingError(msg);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="hospital-container">
      <h2>Nearby Hospitals</h2>

      <p className="user-location">📍 {locationName}</p>

      {loading && <p className="user-location">Loading hospitals...</p>}
      {error   && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {!selectedHospital && !loading && (
        <>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={categoryFilter === cat ? "active" : ""}
                onClick={() => handleFilterChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hospital-grid">
            {filteredHospitals.length === 0 ? (
              <p>No hospitals found for this category.</p>
            ) : (
              filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="hospital-card"
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <img src={hospital.image || "/images/hospital1.jpg"} alt={hospital.name} />
                  <div className="hospital-info">
                    <h3>{hospital.name}</h3>
                    <p>{hospital.address}</p>
                    {hospital.distance && <p className="distance">📍 {hospital.distance}</p>}
                    <p className="phone">📞 {hospital.phone}</p>
                    <div style={{ marginTop: 6, display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {hospital.services?.slice(0, 3).map(s => (
                        <span key={s.id} style={{ fontSize: 11, background: "#e8f5e9", color: "#2e7d32", borderRadius: 4, padding: "2px 6px" }}>
                          {s.name}
                        </span>
                      ))}
                      {hospital.services?.length > 3 && (
                        <span style={{ fontSize: 11, color: "#888" }}>+{hospital.services.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ── Hospital detail ── */}
      {selectedHospital && (
        <div className="hospital-details">
          <button className="back-btn" onClick={() => setSelectedHospital(null)}>
            ← Back to Hospitals
          </button>
          <div className="hospital-header">
            <img src={selectedHospital.image || "/images/hospital1.jpg"} alt={selectedHospital.name} />
            <div className="hospital-header-info">
              <h2>{selectedHospital.name}</h2>
              <p>{selectedHospital.address}</p>
              <p>📞 {selectedHospital.phone}</p>

              {selectedHospital.insurances?.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <strong>Accepted Insurances:</strong>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                    {selectedHospital.insurances.map(ins => (
                      <span key={ins.id} style={{ fontSize: 12, background: "#e3f2fd", color: "#1565c0", borderRadius: 4, padding: "2px 8px" }}>
                        {ins.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedHospital.departments?.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <strong>Departments:</strong>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                    {selectedHospital.departments.map(dep => (
                      <span key={dep.id} style={{ fontSize: 12, background: "#f3e5f5", color: "#6a1b9a", borderRadius: 4, padding: "2px 8px" }}>
                        {dep.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* ── Book Appointment button ── */}
              <button
                onClick={() => handleBookAppointment({ id: null, name: "Any Available Doctor", specialty: "" })}
                style={{
                  marginTop: 16,
                  padding: "10px 22px",
                  background: "linear-gradient(135deg, #1565c0, #42a5f5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                📅 Book Appointment
              </button>
            </div>
          </div>

          <h3>Available Physicians</h3>
          <div className="doctor-grid">
            {selectedHospital.doctors?.length > 0 ? (
              selectedHospital.doctors.map((doc) => (
                <div key={doc.id} className="doctor-card">
                  <img src="/images/doctor.png" alt={doc.name} />
                  <h4>{doc.name}</h4>
                  <p>{doc.specialty}</p>
                  <button onClick={() => handleBookAppointment(doc)}>
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <p>No physicians listed for this hospital.</p>
            )}
          </div>
        </div>
      )}

      {/* ── Booking Modal ── */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            {bookingSuccess ? (
              // ── Success screen ──
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                <h3 style={{ color: "#2e7d32", marginBottom: 8 }}>Booking Confirmed!</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
                  Your appointment with <strong>{selectedDoctor?.name}</strong><br />
                  at <strong>{selectedHospital?.name}</strong> has been booked.
                </p>
              </div>
            ) : (
              // ── Form ──
              <>
                <h3>Book Appointment</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                  🏥 {selectedHospital?.name}&nbsp;·&nbsp;👨‍⚕️ {selectedDoctor?.name}
                </p>

                {bookingError && (
                  <p style={{
                    color: "#dc2626", fontSize: 13,
                    background: "#fee2e2", padding: "8px 12px",
                    borderRadius: 8, marginBottom: 14,
                  }}>
                    ⚠️ {bookingError}
                  </p>
                )}

                <form onSubmit={handleSubmitAppointment}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={appointmentData.patientName}
                    onChange={(e) => setAppointmentData({ ...appointmentData, patientName: e.target.value })}
                    required
                  />

                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+250 7XX XXX XXX"
                    value={appointmentData.phone}
                    onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                    required
                  />

                  <label>Date</label>
                  <input
                    type="date"
                    value={appointmentData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                    required
                  />

                  <label>Time</label>
                  <input
                    type="time"
                    value={appointmentData.time}
                    onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                    required
                  />

                  <label>Health Condition / Reason</label>
                  <input
                    type="text"
                    placeholder="e.g. Chest pain, Fever, Routine checkup..."
                    value={appointmentData.condition}
                    onChange={(e) => setAppointmentData({ ...appointmentData, condition: e.target.value })}
                    required
                  />

                  <label>Service Needed</label>
                  <select
                    value={appointmentData.service}
                    onChange={(e) => setAppointmentData({ ...appointmentData, service: e.target.value })}
                    required
                  >
                    <option value="">-- Select a service --</option>
                    {selectedHospital?.services?.map(s => (
                      <option key={s.id} value={s.name}>{s.name}{s.price ? ` — RWF ${Number(s.price).toLocaleString()}` : ""}</option>
                    ))}
                  </select>

                  <div className="modal-buttons">
                    <button type="submit" disabled={bookingLoading}>
                      {bookingLoading ? "Booking..." : "Confirm Booking"}
                    </button>
                    <button type="button" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyHospitals;