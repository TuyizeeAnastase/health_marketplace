import React, { useState, useRef } from "react";

// ─── Inline styles ────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pd-wrap {
    min-height: 100vh;
    background: #f0f4ff;
    font-family: 'Outfit', sans-serif;
    color: #1e2233;
  }

  /* ── Top nav bar ── */
  .pd-nav {
    background: #1e2233;
    padding: 0 32px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 20px rgba(0,0,0,0.2);
  }

  .pd-nav-logo {
    font-family: 'Lora', serif;
    font-size: 20px;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .pd-nav-logo span { color: #60a5fa; }

  .pd-nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pd-avatar {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 700; color: #fff;
    cursor: pointer;
    border: 2px solid rgba(255,255,255,0.2);
  }

  /* ── Hero banner ── */
  .pd-hero {
    background: linear-gradient(135deg, #1e2233 0%, #2d3561 50%, #1e3a8a 100%);
    padding: 40px 32px 48px;
    position: relative;
    overflow: hidden;
  }

  .pd-hero::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 32px;
    background: #f0f4ff;
    border-radius: 32px 32px 0 0;
  }

  .pd-hero-circles {
    position: absolute;
    top: -40px; right: -40px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(96,165,250,0.08);
    border: 1px solid rgba(96,165,250,0.12);
  }
  .pd-hero-circles::after {
    content: '';
    position: absolute;
    top: 30px; left: 30px; right: 30px; bottom: 30px;
    border-radius: 50%;
    background: rgba(96,165,250,0.06);
    border: 1px solid rgba(96,165,250,0.1);
  }

  .pd-hero-content { position: relative; z-index: 1; }

  .pd-hero-greeting {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .pd-hero-name {
    font-family: 'Lora', serif;
    font-size: 34px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .pd-hero-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
  }

  .pd-hero-pills {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .pd-hero-pill {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 14px;
    border-radius: 999px;
    backdrop-filter: blur(8px);
  }

  .pd-hero-pill.blood { background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.3); color: #fca5a5; }

  /* ── Body ── */
  .pd-body {
    max-width: 1100px;
    margin: 0 auto;
    padding: 28px 20px 80px;
  }

  /* ── Section label ── */
  .pd-section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 14px;
    margin-top: 32px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pd-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  /* ── Cards grid ── */
  .pd-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .pd-card {
    background: #fff;
    border-radius: 20px;
    padding: 22px 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    border: 1px solid #e8edf5;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pd-card-title {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pd-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 14px;
  }
  .pd-info-row:last-child { border-bottom: none; }
  .pd-info-label { color: #94a3b8; font-weight: 500; }
  .pd-info-value { font-weight: 600; color: #1e2233; }

  /* ── Edit modal ── */
  .pd-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 200;
    padding: 20px;
  }

  .pd-modal {
    background: #fff;
    border-radius: 24px;
    padding: 32px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.15);
    animation: fadeUp 0.3s ease both;
  }

  .pd-modal-title {
    font-family: 'Lora', serif;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #1e2233;
  }

  .pd-field { margin-bottom: 16px; }
  .pd-field label { display: block; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
  .pd-field input {
    width: 100%; padding: 11px 14px;
    border: 1px solid #e2e8f0; border-radius: 12px;
    font-family: 'Outfit', sans-serif; font-size: 14px; color: #1e2233;
    outline: none; transition: border-color 0.2s;
  }
  .pd-field input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

  .pd-modal-btns { display: flex; gap: 10px; margin-top: 24px; }
  .pd-btn-primary {
    flex: 1; padding: 12px; border: none; border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #fff; font-size: 14px; font-weight: 600;
    font-family: 'Outfit', sans-serif; cursor: pointer;
    transition: opacity 0.2s;
  }
  .pd-btn-primary:hover { opacity: 0.88; }
  .pd-btn-ghost {
    flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px;
    background: none; color: #64748b; font-size: 14px; font-weight: 600;
    font-family: 'Outfit', sans-serif; cursor: pointer;
  }

  /* ── Stats row ── */
  .pd-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 4px;
  }

  .pd-stat-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    text-align: center;
    border: 1px solid #e8edf5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }

  .pd-stat-num {
    font-family: 'Lora', serif;
    font-size: 28px;
    font-weight: 600;
    color: #1e2233;
    line-height: 1;
    margin-bottom: 4px;
  }
  .pd-stat-label { font-size: 11px; color: #94a3b8; font-weight: 500; }

  /* ── Appointment cards ── */
  .pd-appt-list { display: flex; flex-direction: column; gap: 12px; }

  .pd-appt-card {
    background: #fff;
    border-radius: 18px;
    padding: 20px 22px;
    border: 1px solid #e8edf5;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    display: flex;
    gap: 16px;
    align-items: flex-start;
    animation: fadeUp 0.4s ease both;
    transition: transform 0.2s;
  }
  .pd-appt-card:hover { transform: translateY(-2px); }

  .pd-appt-date-box {
    min-width: 52px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
    padding: 8px 6px;
    text-align: center;
    color: #fff;
    flex-shrink: 0;
  }
  .pd-appt-day   { font-size: 22px; font-weight: 800; line-height: 1; }
  .pd-appt-month { font-size: 10px; font-weight: 600; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em; }

  .pd-appt-body { flex: 1; }

  .pd-appt-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }

  .pd-appt-hospital { font-size: 16px; font-weight: 700; color: #1e2233; }
  .pd-appt-doctor   { font-size: 13px; color: #64748b; margin-top: 1px; }

  .pd-badge {
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .pd-badge.completed { background: #dcfce7; color: #16a34a; }
  .pd-badge.upcoming  { background: #fef3c7; color: #d97706; }
  .pd-badge.cancelled { background: #fee2e2; color: #dc2626; }

  .pd-appt-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 12px;
    color: #94a3b8;
    margin-top: 8px;
  }
  .pd-appt-meta span { display: flex; align-items: center; gap: 4px; }

  /* ── Medicine refill cards ── */
  .pd-med-list { display: flex; flex-direction: column; gap: 12px; }

  .pd-med-card {
    background: #fff;
    border-radius: 18px;
    padding: 18px 22px;
    border: 1px solid #e8edf5;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    animation: fadeUp 0.4s ease both;
  }

  .pd-med-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .pd-med-name  { font-size: 15px; font-weight: 700; color: #1e2233; }
  .pd-med-dates {
    display: flex; gap: 20px; flex-wrap: wrap;
    font-size: 12px; color: #64748b;
    padding: 10px 0;
    border-top: 1px solid #f1f5f9;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 12px;
  }
  .pd-med-dates span strong { display: block; font-size: 13px; color: #1e2233; font-weight: 600; }

  .pd-med-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pd-med-status {
    font-size: 12px; font-weight: 600;
    padding: 4px 10px; border-radius: 999px;
  }
  .pd-med-status.due      { background: #fee2e2; color: #dc2626; }
  .pd-med-status.upcoming { background: #fef3c7; color: #d97706; }
  .pd-med-status.ok       { background: #dcfce7; color: #16a34a; }

  /* Toggle switch */
  .pd-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
  .pd-switch input { display: none; }
  .pd-switch-slider {
    position: absolute; cursor: pointer;
    background: #cbd5e1; border-radius: 34px;
    top: 0; left: 0; right: 0; bottom: 0;
    transition: 0.3s;
  }
  .pd-switch-slider::before {
    content: ''; position: absolute;
    height: 18px; width: 18px;
    left: 3px; bottom: 3px;
    background: #fff; border-radius: 50%;
    transition: 0.3s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .pd-switch input:checked + .pd-switch-slider { background: #3b82f6; }
  .pd-switch input:checked + .pd-switch-slider::before { transform: translateX(20px); }

  .pd-reminder-label {
    font-size: 13px; font-weight: 500;
    color: #64748b;
    display: flex; align-items: center; gap: 8px;
  }
  .pd-reminder-label.on { color: #3b82f6; }

  /* ── Ordered medicines ── */
  .pd-order-list { display: flex; flex-direction: column; gap: 10px; }

  .pd-order-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px 20px;
    border: 1px solid #e8edf5;
    display: flex;
    align-items: center;
    gap: 16px;
    animation: fadeUp 0.4s ease both;
  }

  .pd-order-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: linear-gradient(135deg, #dbeafe, #ede9fe);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }

  .pd-order-info { flex: 1; }
  .pd-order-name { font-size: 14px; font-weight: 700; color: #1e2233; margin-bottom: 2px; }
  .pd-order-meta { font-size: 12px; color: #94a3b8; }

  .pd-order-price { font-size: 15px; font-weight: 700; color: #3b82f6; white-space: nowrap; }

  /* ── Edit profile btn ── */
  .pd-edit-btn {
    display: flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #fff; border: none; border-radius: 12px;
    padding: 9px 18px; font-size: 13px; font-weight: 600;
    font-family: 'Outfit', sans-serif; cursor: pointer;
    transition: opacity 0.2s;
  }
  .pd-edit-btn:hover { opacity: 0.88; }

  /* ── Conditions ── */
  .pd-conditions { display: flex; flex-wrap: wrap; gap: 8px; }
  .pd-condition-tag {
    background: #f0f4ff;
    border: 1px solid #bfdbfe;
    color: #3b82f6;
    font-size: 13px; font-weight: 600;
    padding: 6px 14px; border-radius: 999px;
  }

  @media (max-width: 640px) {
    .pd-hero { padding: 28px 16px 40px; }
    .pd-hero-name { font-size: 26px; }
    .pd-body { padding: 20px 12px 60px; }
    .pd-nav { padding: 0 16px; }
    .pd-appt-card { flex-direction: column; }
  }
`;

// ─── Helper: parse date string ────────────────────────────────────────────────
function parseDate(str) {
  const d = new Date(str);
  if (isNaN(d)) return { day: str, month: '' };
  return {
    day:   d.getDate(),
    month: d.toLocaleString('default', { month: 'short' }),
  };
}

// ─── FullWidthSlider (kept for compatibility) ─────────────────────────────────
function FullWidthSlider({ items, renderCard }) {
  const sliderRef = useRef();
  const scrollLeft  = () => sliderRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  const scrollRight = () => sliderRef.current.scrollBy({ left:  window.innerWidth, behavior: 'smooth' });
  return (
    <section style={{ width: '100%', marginBottom: 32, position: 'relative' }}>
      <div ref={sliderRef} style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {items.map((item, i) => (
          <div key={i} style={{ minWidth: '100%', scrollSnapAlign: 'start', padding: '0 4px' }}>
            {renderCard(item)}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
          <button onClick={scrollLeft}  style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 8, cursor: 'pointer' }}>◀</button>
          <button onClick={scrollRight} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 8, cursor: 'pointer' }}>▶</button>
        </div>
      )}
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
function PatientDashboard() {
  const [showEdit, setShowEdit] = useState(false);

  const [patient, setPatient] = useState({
    name:       'John Doe',
    email:      'john@email.com',
    phone:      '+250 788 000 000',
    blood:      'O+',
    dob:        '1990-05-14',
    conditions: ['Diabetes', 'Hypertension'],
  });

  const [editForm, setEditForm] = useState({ ...patient });

  const [appointments] = useState([
    {
      id: 1, hospital: 'City Hospital', doctor: 'Dr. Smith',
      date: '12 March 2026', time: '10:30 AM', status: 'Completed',
      healthCondition: 'Diabetes', lastBought: '01 March 2026',
      lastRefill: '15 March 2026', refillDate: '20 March 2026',
      pharmacy: 'Kigali Pharmacy', pharmacyPhone: '+250 788 111 222',
    },
    {
      id: 2, hospital: 'Hope Clinic', doctor: 'Dr. Adams',
      date: '25 March 2026', time: '02:00 PM', status: 'Upcoming',
      healthCondition: 'Hypertension', lastBought: '10 March 2026',
      lastRefill: '20 March 2026', refillDate: '05 April 2026',
      pharmacy: 'CityMed Pharmacy', pharmacyPhone: '+250 788 333 444',
    },
    {
      id: 3, hospital: 'Hope Clinic', doctor: 'Dr. Johnson',
      date: '02 April 2026', time: '11:00 AM', status: 'Upcoming',
      healthCondition: 'Asthma', lastBought: '15 March 2026',
      lastRefill: '22 March 2026', refillDate: '10 April 2026',
      pharmacy: 'CityMed Pharmacy', pharmacyPhone: '+250 788 333 444',
    },
  ]);

  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Metformin 500mg',    lastBought: '01 March 2026', lastRefill: '15 March 2026', nextRefill: '20 March 2026', status: 'due',     reminder: true  },
    { id: 2, name: 'Amlodipine 10mg',    lastBought: '10 March 2026', lastRefill: '20 March 2026', nextRefill: '05 April 2026', status: 'upcoming', reminder: false },
    { id: 3, name: 'Salbutamol 100mcg',  lastBought: '12 March 2026', lastRefill: '18 March 2026', nextRefill: '25 March 2026', status: 'upcoming', reminder: true  },
  ]);

  const [orders] = useState([
    { id: 1, name: 'Metformin 500mg',   qty: 2, price: 3000,  pharmacy: 'Kigali Pharmacy',   date: '10 Mar 2026' },
    { id: 2, name: 'Salbutamol Inhaler',qty: 1, price: 7500,  pharmacy: 'CityMed Pharmacy',  date: '08 Mar 2026' },
    { id: 3, name: 'Vitamin C 1000mg',  qty: 3, price: 1800,  pharmacy: 'Kigali Pharmacy',   date: '01 Mar 2026' },
  ]);

  const toggleReminder = (id) =>
    setMedicines(medicines.map(m => m.id === id ? { ...m, reminder: !m.reminder } : m));

  const handleSave = () => {
    setPatient({ ...editForm });
    setShowEdit(false);
  };

  const initials = patient.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <>
      <style>{css}</style>
      <div className="pd-wrap">

        {/* ── Nav ── */}
        <nav className="pd-nav">
          <div className="pd-nav-logo">Health<span>Care</span></div>
          <div className="pd-nav-right">
            <button className="pd-edit-btn" onClick={() => { setEditForm({ ...patient }); setShowEdit(true); }}>
              ✏️ Edit Profile
            </button>
            <div className="pd-avatar">{initials}</div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="pd-hero">
          <div className="pd-hero-circles" />
          <div className="pd-hero-content">
            <p className="pd-hero-greeting">Patient Dashboard</p>
            <h1 className="pd-hero-name">Welcome back, {patient.name.split(' ')[0]} 👋</h1>
            <p className="pd-hero-sub">{patient.email} · {patient.phone}</p>
            <div className="pd-hero-pills">
              <span className="pd-hero-pill blood">🩸 {patient.blood}</span>
              {patient.conditions.map(c => (
                <span key={c} className="pd-hero-pill">🏥 {c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pd-body">

          {/* Stats */}
          <div className="pd-stats">
            <div className="pd-stat-card">
              <div className="pd-stat-num">{appointments.length}</div>
              <div className="pd-stat-label">Appointments</div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-num">{appointments.filter(a => a.status === 'Upcoming').length}</div>
              <div className="pd-stat-label">Upcoming</div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-num">{medicines.length}</div>
              <div className="pd-stat-label">Medicines</div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-num">{medicines.filter(m => m.reminder).length}</div>
              <div className="pd-stat-label">Reminders On</div>
            </div>
            <div className="pd-stat-card">
              <div className="pd-stat-num">{orders.length}</div>
              <div className="pd-stat-label">Orders</div>
            </div>
          </div>

          {/* Personal Info */}
          <p className="pd-section-label">👤 Personal Information</p>
          <div className="pd-grid-2">
            <div className="pd-card">
              <p className="pd-card-title">📋 Profile</p>
              {[
                { label: 'Full Name',    value: patient.name  },
                { label: 'Email',        value: patient.email },
                { label: 'Phone',        value: patient.phone },
                { label: 'Blood Group',  value: patient.blood },
                { label: 'Date of Birth',value: patient.dob   },
              ].map(row => (
                <div className="pd-info-row" key={row.label}>
                  <span className="pd-info-label">{row.label}</span>
                  <span className="pd-info-value">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="pd-card">
              <p className="pd-card-title">🏥 Health Conditions</p>
              <div className="pd-conditions" style={{ marginBottom: 20 }}>
                {patient.conditions.map(c => (
                  <span key={c} className="pd-condition-tag">{c}</span>
                ))}
              </div>
              <p className="pd-card-title" style={{ marginTop: 16 }}>💊 Active Medicines</p>
              {medicines.map(m => (
                <div className="pd-info-row" key={m.id}>
                  <span className="pd-info-label">{m.name}</span>
                  <span className={`pd-med-status ${m.status}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <p className="pd-section-label">📅 Booked Appointments</p>
          <div className="pd-appt-list">
            {appointments.map((appt, i) => {
              const { day, month } = parseDate(appt.date);
              return (
                <div className="pd-appt-card" key={appt.id} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="pd-appt-date-box">
                    <div className="pd-appt-day">{day}</div>
                    <div className="pd-appt-month">{month}</div>
                  </div>
                  <div className="pd-appt-body">
                    <div className="pd-appt-top">
                      <div>
                        <div className="pd-appt-hospital">{appt.hospital}</div>
                        <div className="pd-appt-doctor">{appt.doctor}</div>
                      </div>
                      <span className={`pd-badge ${appt.status.toLowerCase()}`}>{appt.status}</span>
                    </div>
                    <div className="pd-appt-meta">
                      <span>🕐 {appt.time}</span>
                      <span>🩺 {appt.healthCondition}</span>
                      <span>💊 {appt.pharmacy}</span>
                      <span>📞 {appt.pharmacyPhone}</span>
                    </div>
                    <div className="pd-appt-meta" style={{ marginTop: 6 }}>
                      <span>🛒 Last bought: {appt.lastBought}</span>
                      <span>🔄 Last refill: {appt.lastRefill}</span>
                      <span>📆 Next refill: {appt.refillDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Medicine Refills */}
          <p className="pd-section-label">💊 Medicine Refills</p>
          <div className="pd-med-list">
            {medicines.map((med, i) => (
              <div className="pd-med-card" key={med.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="pd-med-top">
                  <div className="pd-med-name">💊 {med.name}</div>
                  <span className={`pd-med-status ${med.status}`}>
                    {med.status === 'due' ? '⚠️ Due Soon' : '📅 Upcoming'}
                  </span>
                </div>
                <div className="pd-med-dates">
                  <span><strong>{med.lastBought}</strong>Last Bought</span>
                  <span><strong>{med.lastRefill}</strong>Last Refill</span>
                  <span><strong>{med.nextRefill}</strong>Next Refill</span>
                </div>
                <div className="pd-med-bottom">
                  <label className={`pd-reminder-label ${med.reminder ? 'on' : ''}`}>
                    <label className="pd-switch">
                      <input type="checkbox" checked={med.reminder} onChange={() => toggleReminder(med.id)} />
                      <span className="pd-switch-slider" />
                    </label>
                    {med.reminder ? '🔔 Reminder On' : '🔕 Reminder Off'}
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Ordered Medicines */}
          <p className="pd-section-label">🛒 Ordered Medicines</p>
          <div className="pd-order-list">
            {orders.map((order, i) => (
              <div className="pd-order-card" key={order.id} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="pd-order-icon">💊</div>
                <div className="pd-order-info">
                  <div className="pd-order-name">{order.name}</div>
                  <div className="pd-order-meta">
                    Qty: {order.qty} · {order.pharmacy} · {order.date}
                  </div>
                </div>
                <div className="pd-order-price">RWF {order.price.toLocaleString()}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Edit Profile Modal ── */}
        {showEdit && (
          <div className="pd-modal-overlay" onClick={() => setShowEdit(false)}>
            <div className="pd-modal" onClick={e => e.stopPropagation()}>
              <p className="pd-modal-title">Edit Profile</p>
              {[
                { label: 'Full Name',    key: 'name',  type: 'text'  },
                { label: 'Email',        key: 'email', type: 'email' },
                { label: 'Phone',        key: 'phone', type: 'tel'   },
                { label: 'Blood Group',  key: 'blood', type: 'text'  },
                { label: 'Date of Birth',key: 'dob',   type: 'date'  },
              ].map(f => (
                <div className="pd-field" key={f.key}>
                  <label>{f.label}</label>
                  <input
                    type={f.type}
                    value={editForm[f.key]}
                    onChange={e => setEditForm({ ...editForm, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="pd-modal-btns">
                <button className="pd-btn-ghost" onClick={() => setShowEdit(false)}>Cancel</button>
                <button className="pd-btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default PatientDashboard;