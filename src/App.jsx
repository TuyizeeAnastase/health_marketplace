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
import Registration from './pages/Register';
import DoctorsList from "./pages/Doctors";
import DoctorDetail from "./pages/Doctor_details"
import MedicinesList from "./pages/MedicinesList";
import MedicineDetail from "./pages/MedicineDetail";
import About from "./pages/About"


function App() {
  return (
    <Router>
      <Navbar />
      {/* MAIN CONTENT OFFSET */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/pharmacies" element={<PharmacyList />} />
          <Route path="/pharmacy/:id" element={<PharmacyDetail />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medicines" element={<MedicinesList />} />
          <Route path="/medicines/:id" element={<MedicineDetail />} />
          <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
          <Route path="/about" element={<About/>}/>
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
