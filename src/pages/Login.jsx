import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    otp: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendOtp = () => {
    if (!formData.phone) return alert('Please enter your phone number');
    setStep(2);
    alert('OTP sent to ' + formData.phone);
  };

  const verifyOtp = () => {
    if (!formData.otp) return alert('Please enter OTP');
    alert('Login successful!');
    // Redirect to home or dashboard (later based on user role)
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>

      {step === 1 && (
        <div className="login-step">
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
        <div className="login-step">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
          />
          <label>Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter received OTP"
            value={formData.otp}
            onChange={handleChange}
          />
          <button onClick={verifyOtp}>Verify & Login</button>
        </div>
      )}

      <p className="login-footer">
        Don’t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default Login;
