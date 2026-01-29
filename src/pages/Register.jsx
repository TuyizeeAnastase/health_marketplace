import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [step, setStep] = useState(1); // Step 1: phone, Step 2: OTP, Step 3: details
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    name: "",
    email: "",
    insurance: "",
    businessName: "",
    businessType: "",
    location: "",
  });

  // Auto-detect location for vendors
  useEffect(() => {
    if (userType === "vendor" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const location = response.data.display_name;
            setFormData((prev) => ({
              ...prev,
              location,
            }));
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please enable location access to auto-fill your address.");
        }
      );
    }
  }, [userType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = () => {
    if (!formData.phone) return alert("Enter phone number");
    setStep(2);
    alert("OTP sent to " + formData.phone);
  };

  const verifyOtp = () => {
    if (!formData.otp) return alert("Enter OTP");
    setStep(3);
    alert("OTP verified");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration complete for " + userType);
    console.log(formData);
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>

      {step === 1 && (
        <div className="register-step">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <>
        <div className="register-step">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          </div>
        <div className="register-step">
          <label>Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter received OTP"
            value={formData.otp}
            onChange={handleChange}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
        </>
      )}

      {step === 3 && (
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="user-type">
            <label>
              <input
                type="radio"
                name="type"
                value="user"
                checked={userType === "user"}
                onChange={() => setUserType("user")}
              />
              Normal User
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="vendor"
                checked={userType === "vendor"}
                onChange={() => setUserType("vendor")}
              />
              Vendor
            </label>
          </div>
          <div className="register-step">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          </div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          {userType === "user" && (
            <>
              <label>Insurance Company</label>
              <input
                type="text"
                name="insurance"
                placeholder="Enter your insurance provider"
                value={formData.insurance}
                onChange={handleChange}
              />
            </>
          )}

          {userType === "vendor" && (
            <>
              <label>Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleChange}
              />

              <label>Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="hospital">Hospital</option>
              </select>

              <label>Detected Location</label>
              <input
                type="text"
                name="location"
                placeholder="Auto-detected location"
                value={formData.location}
                onChange={handleChange}
                readOnly
              />
            </>
          )}

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default Register;
