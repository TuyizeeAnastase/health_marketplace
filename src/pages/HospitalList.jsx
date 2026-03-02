import React, { useEffect, useState } from "react";
import "./Hospitals.css";

function NearbyHospitals() {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    patientName: "",
    date: "",
    time: "",
  });
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const sampleHospitals = [
      {
        id: 1,
        name: "Kigali Central Hospital",
        image: "/images/hospital1.jpg",
        address: "KN 5 Rd, Kigali",
        distance: "1.1 km",
        phone: "+250 788 100 111",
        category: "Cardiology",
        doctors: [
          { id: 1, name: "Dr. Alice Mukamana", specialty: "Cardiologist" },
          { id: 2, name: "Dr. John Nkurunziza", specialty: "General Physician" },
        ],
      },
      {
        id: 2,
        name: "Remera Polyclinic",
        image: "/images/hospital2.jpg",
        address: "KG 15 Ave, Remera",
        distance: "2.0 km",
        phone: "+250 781 555 666",
        category: "Pediatrics",
        doctors: [
          { id: 3, name: "Dr. Claudine Uwimana", specialty: "Pediatrician" },
          { id: 4, name: "Dr. Eric Ndayambaje", specialty: "Dermatologist" },
        ],
      },
      {
        id: 3,
        name: "Kanombe Military Hospital",
        image: "/images/hospital3.jpg",
        address: "KK 31 Ave, Kanombe",
        distance: "5.3 km",
        phone: "+250 788 777 888",
        category: "Orthopedic",
        doctors: [
          { id: 5, name: "Dr. Grace Tuyishime", specialty: "Orthopedic Surgeon" },
          { id: 6, name: "Dr. Patrick Karangwa", specialty: "ENT Specialist" },
        ],
      },
    ];

    setHospitals(sampleHospitals);
    setFilteredHospitals(sampleHospitals);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  // Filter hospitals by category
  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    if (category === "All") setFilteredHospitals(hospitals);
    else
      setFilteredHospitals(hospitals.filter((h) => h.category === category));
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    alert(
      `Appointment booked with ${selectedDoctor.name} on ${appointmentData.date} at ${appointmentData.time}`
    );
    setShowModal(false);
    setAppointmentData({ patientName: "", date: "", time: "" });
  };

  return (
    <div className="hospital-container">
      <h2>Nearby Hospitals</h2>

      {userLocation ? (
        <p className="user-location">
          Your location detected ✅ (lat: {userLocation.lat.toFixed(4)}, lng:{" "}
          {userLocation.lng.toFixed(4)})
        </p>
      ) : (
        <p className="user-location">Detecting your location...</p>
      )}

      {!selectedHospital && (
        <>
          <div className="filter-buttons">
            {["All", "Cardiology", "Pediatrics", "Orthopedic"].map((cat) => (
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
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="hospital-card"
                onClick={() => handleHospitalClick(hospital)}
              >
                <img src={hospital.image} alt={hospital.name} />
                <div className="hospital-info">
                  <h3>{hospital.name}</h3>
                  <p>{hospital.address}</p>
                  <p className="distance">📍 {hospital.distance}</p>
                  <p className="phone">📞 {hospital.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedHospital && (
        <div className="hospital-details">
          <button className="back-btn" onClick={() => setSelectedHospital(null)}>
            ← Back to Hospitals
          </button>
          <div className="hospital-header">
            <img src={selectedHospital.image} alt={selectedHospital.name} />
            <div className="hospital-header-info">
              <h2>{selectedHospital.name}</h2>
              <p>{selectedHospital.address}</p>
              <p>📞 {selectedHospital.phone}</p>
            </div>
          </div>

          <h3>Available Physicians</h3>
          <div className="doctor-grid">
            {selectedHospital.doctors.map((doc) => (
              <div key={doc.id} className="doctor-card">
                <img src="/images/doctor.png" alt={doc.name} />
                <h4>{doc.name}</h4>
                <p>{doc.specialty}</p>
                <button onClick={() => handleBookAppointment(doc)}>
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Book Appointment with {selectedDoctor.name}</h3>
            <form onSubmit={handleSubmitAppointment}>
              <label>Full Name</label>
              <input
                type="text"
                value={appointmentData.patientName}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    patientName: e.target.value,
                  })
                }
                required
              />
              <label>Date</label>
              <input
                type="date"
                value={appointmentData.date}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    date: e.target.value,
                  })
                }
                required
              />
              <label>Time</label>
              <input
                type="time"
                value={appointmentData.time}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    time: e.target.value,
                  })
                }
                required
              />
              <div className="modal-buttons">
                <button type="submit">Confirm</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyHospitals;