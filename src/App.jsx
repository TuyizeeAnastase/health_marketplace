import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import PharmacyList from './pages/PharmacyList';
import PharmacyDetail from './pages/PharmacyDetail';
import HospitalList from './pages/HospitalList';
import HospitalDetail from './pages/HospitalDetail';
import Profile from './pages/UserProfile';
import PharmacyDashboard from './pages/Dashboard/PharmacyDashboard';
import HospitalDashboard from './pages/Dashboard/HospitalDashboard';
import Registration from './pages/registration';


function App() {
  return (
    <Router>
      <Navbar />
      {/* MAIN CONTENT OFFSET */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/pharmacies" element={<PharmacyList />} />
          <Route path="/pharmacy/:id" element={<PharmacyDetail />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
