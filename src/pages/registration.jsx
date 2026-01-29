import React, { useState } from "react";
import api from "../api/axios"
import "./registration.css";

export default function Registration() {
  const [role, setRole] = useState("pharmacy"); // "pharmacy" or "hospital"
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    fullName: "",
    email: "",
    pharmacyName: "",
    licenseNumber: "",
    city: "",
    onlineOrdering: "no",
    hospitalName: "",
    registrationNumber: "",
    departments: "",
    allowDoctorBooking: "no",
  });

  return (
    <div className="container">
      <div className="card">
        <h1>Health Marketplace Registration</h1>

        {/* Role switch */}
        <div className="role-switch">
          <button
            className={role === "pharmacy" ? "active" : ""}
            onClick={() => setRole("pharmacy")}
          >
            Pharmacy
          </button>
          <button
            className={role === "hospital" ? "active" : ""}
            onClick={() => setRole("hospital")}
          >
            Hospital
          </button>
        </div>

        <div className="steps">Step {step} of 3</div>

        {/* Step Components */}
        {step === 1 && (
          <PhoneVerification
            formData={formData}
            setFormData={setFormData}
            role={role}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && role === "pharmacy" && (
          <PharmacyForm
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(3)}
          />
        )}

        {step === 2 && role === "hospital" && (
          <HospitalForm
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && <Success />}
      </div>
    </div>
  );
}

/* ================= Phone Verification Step ================= */
function PhoneVerification({ formData, setFormData, role, onNext }) {
  const sendOtp = async () => {
    if (!formData.phone) return alert("Enter phone number");

    try {
      await api.post("/auth/register", {
        phone: formData.phone,
        roleId: role === "pharmacy" ? 2 : 3, // Example role IDs
        fullName: "TEMP",
        password: "Temp@123",
      });

      alert("OTP sent to " + formData.phone);
      onNext();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!formData.otp) return alert("Enter OTP");

    try {
      await api.post("/auth/verify-otp", {
        phone: formData.phone,
        code: formData.otp,
      });

      alert("OTP verified!");
      onNext();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="form">
      <h2>Verify Phone Number</h2>

      <input
        type="tel"
        placeholder="Phone Number(07xxxxx)"
        value={formData.phone}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
      />
      <button className="secondary" onClick={sendOtp}>
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={formData.otp}
        onChange={(e) =>
          setFormData({ ...formData, otp: e.target.value })
        }
      />
      <button onClick={verifyOtp}>Verify & Continue</button>
    </div>
  );
}

/* ================= Pharmacy Details Step ================= */
function PharmacyForm({ formData, setFormData, onNext }) {
  const handleSubmit = async () => {
    if (!formData.fullName || !formData.pharmacyName)
      return alert("Please fill all required fields");

    try {
      // Complete profile API call
      await api.post("/auth/complete-profile", {
        name: formData.fullName,
        email: formData.email,
        pharmacyName: formData.pharmacyName,
        licenseNumber: formData.licenseNumber,
        city: formData.city,
        onlineOrdering: formData.onlineOrdering,
        phone: formData.phone,
      });

      alert("Pharmacy profile submitted successfully!");
      onNext();
    } catch (err) {
      console.log(err)
      alert(err.response?.data?.message || "Failed to submit profile");
    }
  };

  return (
    <div className="form">
      <h2>Pharmacy Details</h2>

      <input
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) =>
          setFormData({ ...formData, fullName: e.target.value })
        }
      />
      <input
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
      <input
        placeholder="Pharmacy Name"
        value={formData.pharmacyName}
        onChange={(e) =>
          setFormData({ ...formData, pharmacyName: e.target.value })
        }
      />
      <input
        placeholder="License Number"
        value={formData.licenseNumber}
        onChange={(e) =>
          setFormData({ ...formData, licenseNumber: e.target.value })
        }
      />
      <input
        placeholder="City"
        value={formData.city}
        onChange={(e) =>
          setFormData({ ...formData, city: e.target.value })
        }
      />
      <select
        value={formData.onlineOrdering}
        onChange={(e) =>
          setFormData({ ...formData, onlineOrdering: e.target.value })
        }
      >
        <option value="no">Online Ordering</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

/* ================= Hospital Details Step ================= */
function HospitalForm({ formData, setFormData, onNext }) {
  const handleSubmit = async () => {
    if (!formData.fullName || !formData.hospitalName)
      return alert("Please fill all required fields");

    try {
      await api.post("/auth/complete-profile", {
        fullName: formData.fullName,
        email: formData.email,
        hospitalName: formData.hospitalName,
        registrationNumber: formData.registrationNumber,
        departments: formData.departments,
        allowDoctorBooking: formData.allowDoctorBooking,
        phone: formData.phone,
      });

      alert("Hospital profile submitted successfully!");
      onNext();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit profile");
    }
  };

  return (
    <div className="form">
      <h2>Hospital Details</h2>

      <input
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) =>
          setFormData({ ...formData, fullName: e.target.value })
        }
      />
      <input
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
      <input
        placeholder="Hospital Name"
        value={formData.hospitalName}
        onChange={(e) =>
          setFormData({ ...formData, hospitalName: e.target.value })
        }
      />
      <input
        placeholder="Registration Number"
        value={formData.registrationNumber}
        onChange={(e) =>
          setFormData({ ...formData, registrationNumber: e.target.value })
        }
      />
      <input
        placeholder="Departments (comma separated)"
        value={formData.departments}
        onChange={(e) =>
          setFormData({ ...formData, departments: e.target.value })
        }
      />
      <select
        value={formData.allowDoctorBooking}
        onChange={(e) =>
          setFormData({ ...formData, allowDoctorBooking: e.target.value })
        }
      >
        <option value="no">Allow Doctor Booking</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

/* ================= Success Step ================= */
function Success() {
  return (
    <div className="success">
      <h2>Registration Successful 🎉</h2>
      <p>Your account will be reviewed before activation.</p>
    </div>
  );
}
