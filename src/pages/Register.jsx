import React, { useState, useEffect } from "react";
import axios from "axios";
import "./registration";

const HOSPITAL_API  = "http://localhost:3500/api/v1/hospitals";
const PHARMACY_API  = "http://localhost:3500/api/v1/pharmacies";

function Register() {
  const [vendorTab, setVendorTab] = useState("hospital");
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    businessName: "",
    businessType: "hospital",
    location: "",
    hospitalLicense: "",
    numberOfDoctors: "",
    pharmacyLicense: "",
    operatingHours: "",
  });

  // Auto-detect location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            setFormData((prev) => ({
              ...prev,
              location: response.data.display_name,
            }));
          } catch (error) {
            console.error("Location fetch error:", error);
          }
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (vendorTab === "hospital") {
        // ── Hospital payload ────────────────────────────────
        await axios.post(HOSPITAL_API, {
          name:          formData.businessName,
          email:         formData.email,
          phone:         formData.phone,
          address:       formData.location,
          licence:       formData.hospitalLicense,
          is_active:     false,
        });

      } else {
        // ── Pharmacy payload ────────────────────────────────
        await axios.post(PHARMACY_API, {
          name:          formData.businessName,
          email:         formData.email,
          phone:         formData.phone,
          address:       formData.location,
          licence:       formData.pharmacyLicense,
          is_active:     false,
        });
      }

      setSuccess(true);

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        {!success ? (
          <>
            <h1>Health Marketplace</h1>

            <div className="steps">
              Register your hospital or pharmacy
            </div>

            {/* Error message */}
            {error && (
              <div style={{ color: "red", marginBottom: 12, fontSize: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
              <h2>Business Registration</h2>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Contact Person Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              {/* Tabs */}
              <div className="role-switch">
                <button
                  type="button"
                  className={vendorTab === "hospital" ? "active" : ""}
                  onClick={() => {
                    setVendorTab("hospital");
                    setFormData({ ...formData, businessType: "hospital" });
                  }}
                >
                  Hospital
                </button>

                <button
                  type="button"
                  className={vendorTab === "pharmacy" ? "active" : ""}
                  onClick={() => {
                    setVendorTab("pharmacy");
                    setFormData({ ...formData, businessType: "pharmacy" });
                  }}
                >
                  Pharmacy
                </button>
              </div>

              <input
                type="text"
                name="businessName"
                placeholder={`${
                  vendorTab === "hospital" ? "Hospital Name" : "Pharmacy Name"
                }`}
                value={formData.businessName}
                onChange={handleChange}
                required
              />

              {/* Hospital Fields */}
              {vendorTab === "hospital" && (
                <>
                  <input
                    type="text"
                    name="hospitalLicense"
                    placeholder="Hospital License Number"
                    value={formData.hospitalLicense}
                    onChange={handleChange}
                    required
                  />

            
                </>
              )}

              {/* Pharmacy Fields */}
              {vendorTab === "pharmacy" && (
                <>
                  <input
                    type="text"
                    name="pharmacyLicense"
                    placeholder="Pharmacy License Number"
                    value={formData.pharmacyLicense}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <input
                type="text"
                name="location"
                placeholder="Detected Location"
                value={formData.location}
                readOnly
              />

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Register Business"}
              </button>
            </form>
          </>
        ) : (
          <div className="success">
            <h2>Registration Successful 🎉</h2>
            <p>Your business has been submitted for review.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;