import React, { useState } from "react";

// ─── CSS (matching PatientDashboard style) ────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ho-wrap {
    min-height: 100vh;
    background: #f0f4ff;
    font-family: 'Outfit', sans-serif;
    color: #1e2233;
  }

  /* ── Nav ── */
  .ho-nav {
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
  .ho-nav-logo { font-family: 'Lora', serif; font-size: 20px; color: #fff; }
  .ho-nav-logo span { color: #60a5fa; }
  .ho-nav-right { display: flex; align-items: center; gap: 10px; }
  .ho-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 700; color: #fff;
    border: 2px solid rgba(255,255,255,0.2);
  }
  .ho-nav-tabs {
    display: flex; gap: 2px;
    background: rgba(255,255,255,0.07);
    border-radius: 10px; padding: 3px;
  }
  .ho-nav-tab {
    padding: 6px 14px; border-radius: 8px; border: none;
    background: none; color: rgba(255,255,255,0.5);
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.18s;
  }
  .ho-nav-tab.active { background: rgba(255,255,255,0.12); color: #fff; font-weight: 600; }

  /* ── Hero ── */
  .ho-hero {
    background: linear-gradient(135deg, #1e2233 0%, #163b6e 50%, #1e3a8a 100%);
    padding: 36px 32px 48px;
    position: relative; overflow: hidden;
  }
  .ho-hero::after {
    content: ''; position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 32px; background: #f0f4ff;
    border-radius: 32px 32px 0 0;
  }
  .ho-hero-deco {
    position: absolute; top: -30px; right: -30px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(96,165,250,0.07);
    border: 1px solid rgba(96,165,250,0.1);
  }
  .ho-hero-deco::after {
    content: ''; position: absolute;
    top: 28px; left: 28px; right: 28px; bottom: 28px;
    border-radius: 50%; background: rgba(96,165,250,0.05);
    border: 1px solid rgba(96,165,250,0.08);
  }
  .ho-hero-content { position: relative; z-index: 1; }
  .ho-hero-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.4);
    margin-bottom: 6px;
  }
  .ho-hero-name {
    font-family: 'Lora', serif; font-size: 32px; color: #fff;
    margin-bottom: 6px; line-height: 1.2;
  }
  .ho-hero-sub { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 18px; }
  .ho-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .ho-pill {
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.14);
    color: #fff; font-size: 12px; font-weight: 500;
    padding: 4px 13px; border-radius: 999px; backdrop-filter: blur(8px);
  }
  .ho-pill.green  { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.25); color: #6ee7b7; }
  .ho-pill.orange { background: rgba(251,146,60,0.15);  border-color: rgba(251,146,60,0.25);  color: #fdba74; }

  /* ── Body ── */
  .ho-body { max-width: 1100px; margin: 0 auto; padding: 28px 20px 80px; }

  /* ── Section label ── */
  .ho-section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: #94a3b8;
    margin-bottom: 14px; margin-top: 32px;
    display: flex; align-items: center; gap: 8px;
  }
  .ho-section-label::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }

  /* ── Stats ── */
  .ho-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px; margin-bottom: 4px;
  }
  .ho-stat-card {
    background: #fff; border-radius: 16px; padding: 16px;
    text-align: center; border: 1px solid #e8edf5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    animation: fadeUp 0.4s ease both;
  }
  .ho-stat-num {
    font-family: 'Lora', serif; font-size: 30px;
    color: #1e2233; line-height: 1; margin-bottom: 4px;
  }
  .ho-stat-label { font-size: 11px; color: #94a3b8; font-weight: 500; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Card ── */
  .ho-card {
    background: #fff; border-radius: 20px; padding: 22px 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    border: 1px solid #e8edf5; animation: fadeUp 0.4s ease both;
  }
  .ho-card-title {
    font-size: 13px; font-weight: 600; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.07em;
    margin-bottom: 16px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .ho-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }

  /* ── Info row ── */
  .ho-info-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px;
  }
  .ho-info-row:last-child { border-bottom: none; }
  .ho-info-label { color: #94a3b8; font-weight: 500; }
  .ho-info-value { font-weight: 600; color: #1e2233; }

  /* ── Buttons ── */
  .ho-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 8px 16px; border-radius: 10px; border: none;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: opacity 0.18s, transform 0.15s;
  }
  .ho-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .ho-btn.primary { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; }
  .ho-btn.success { background: linear-gradient(135deg, #10b981, #34d399); color: #fff; }
  .ho-btn.danger  { background: #fee2e2; color: #dc2626; }
  .ho-btn.ghost   { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
  .ho-btn.sm      { padding: 5px 11px; font-size: 12px; }
  .ho-btn.xs      { padding: 3px 9px; font-size: 11px; border-radius: 8px; }

  /* ── Table ── */
  .ho-table-wrap {
    background: #fff; border-radius: 20px; overflow: hidden;
    border: 1px solid #e8edf5; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    animation: fadeUp 0.4s ease both;
  }
  .ho-table-top {
    padding: 16px 20px; border-bottom: 1px solid #f1f5f9;
    display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .ho-table-title { font-size: 14px; font-weight: 700; color: #1e2233; }
  .ho-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .ho-filter-btn {
    padding: 5px 12px; border-radius: 8px; border: 1px solid #e2e8f0;
    background: none; color: #94a3b8; font-size: 12px; font-weight: 500;
    font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.18s;
  }
  .ho-filter-btn.active, .ho-filter-btn:hover {
    background: #eff6ff; color: #3b82f6; border-color: #bfdbfe;
  }
  table { width: 100%; border-collapse: collapse; }
  thead tr { border-bottom: 1px solid #f1f5f9; }
  th {
    padding: 10px 16px; text-align: left;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8;
  }
  td {
    padding: 13px 16px; font-size: 13px; color: #1e2233;
    border-bottom: 1px solid #f8fafc;
  }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: #fafbff; }

  /* ── Chips ── */
  .chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 999px;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .chip::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .chip.confirmed, .chip.active, .chip.available { background: #dcfce7; color: #16a34a; }
  .chip.upcoming,  .chip.pending                 { background: #fef3c7; color: #d97706; }
  .chip.cancelled, .chip.inactive                { background: #fee2e2; color: #dc2626; }
  .chip.completed                                { background: #dbeafe; color: #2563eb; }

  /* ── Doctor card ── */
  .ho-doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
  .ho-doc-card {
    background: #fff; border-radius: 18px; padding: 20px;
    border: 1px solid #e8edf5; box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    animation: fadeUp 0.4s ease both; text-align: center;
    transition: transform 0.2s;
  }
  .ho-doc-card:hover { transform: translateY(-3px); }
  .ho-doc-avatar {
    width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 12px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 800; color: #fff;
  }
  .ho-doc-name  { font-size: 15px; font-weight: 700; color: #1e2233; margin-bottom: 3px; }
  .ho-doc-spec  { font-size: 12px; color: #64748b; margin-bottom: 4px; }
  .ho-doc-dept  { font-size: 11px; color: #94a3b8; margin-bottom: 12px; }
  .ho-doc-actions { display: flex; gap: 6px; justify-content: center; }

  /* ── Modal ── */
  .ho-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(5px);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 20px;
  }
  .ho-modal {
    background: #fff; border-radius: 24px; padding: 32px;
    width: 100%; max-width: 460px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    animation: fadeUp 0.3s ease both;
    max-height: 90vh; overflow-y: auto;
  }
  .ho-modal-title {
    font-family: 'Lora', serif; font-size: 22px;
    margin-bottom: 24px; color: #1e2233;
  }
  .ho-field { margin-bottom: 15px; }
  .ho-field label {
    display: block; font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #94a3b8; margin-bottom: 6px;
  }
  .ho-field input, .ho-field select, .ho-field textarea {
    width: 100%; padding: 10px 14px;
    border: 1px solid #e2e8f0; border-radius: 12px;
    font-family: 'Outfit', sans-serif; font-size: 14px; color: #1e2233;
    outline: none; transition: border-color 0.2s; background: #fff;
  }
  .ho-field input:focus, .ho-field select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .ho-field textarea { resize: vertical; min-height: 72px; }
  .ho-modal-btns { display: flex; gap: 10px; margin-top: 24px; }
  .ho-modal-btns .ho-btn { flex: 1; justify-content: center; padding: 12px; font-size: 14px; }

  /* ── Search bar ── */
  .ho-search {
    position: relative; max-width: 280px;
  }
  .ho-search input {
    width: 100%; padding: 8px 12px 8px 34px;
    border: 1px solid #e2e8f0; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 13px; color: #1e2233;
    outline: none; transition: border-color 0.2s; background: #fff;
  }
  .ho-search input:focus { border-color: #3b82f6; }
  .ho-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); font-size: 14px; opacity: 0.35; }

  /* ── Actions row ── */
  .ho-actions { display: flex; gap: 5px; }

  @media (max-width: 640px) {
    .ho-hero { padding: 24px 16px 40px; }
    .ho-hero-name { font-size: 24px; }
    .ho-body { padding: 20px 12px 60px; }
    .ho-nav { padding: 0 14px; }
    .ho-nav-tabs { display: none; }
  }
`;

// ─── Sample data ──────────────────────────────────────────────────────────────
const INIT_DOCTORS = [
  { id: 1, name: 'Dr. Alice Mukamana',  specialty: 'Cardiologist',        department: 'Cardiology',       phone: '+250788111001', email: 'alice@kfh.rw',  status: 'active',   experience: '8 years'  },
  { id: 2, name: 'Dr. John Nkurunziza', specialty: 'General Physician',   department: 'Internal Medicine',phone: '+250788111002', email: 'john@kfh.rw',   status: 'active',   experience: '5 years'  },
  { id: 3, name: 'Dr. Grace Tuyishime', specialty: 'Pediatrician',        department: 'Pediatrics',       phone: '+250788111003', email: 'grace@kfh.rw',  status: 'active',   experience: '10 years' },
  { id: 4, name: 'Dr. Eric Ndayambaje', specialty: 'Orthopedic Surgeon',  department: 'Orthopedics',      phone: '+250788111004', email: 'eric@kfh.rw',   status: 'inactive', experience: '12 years' },
];

const INIT_BOOKINGS = [
  { id: 1, patient: 'John Doe',    doctor: 'Dr. Alice Mukamana',  department: 'Cardiology',       date: '12 Mar 2026', time: '10:30 AM', status: 'pending',   condition: 'Chest pain'    },
  { id: 2, patient: 'Alice Uwera', doctor: 'Dr. John Nkurunziza', department: 'Internal Medicine',date: '14 Mar 2026', time: '09:00 AM', status: 'confirmed', condition: 'Hypertension'  },
  { id: 3, patient: 'Eric Mugabo', doctor: 'Dr. Grace Tuyishime', department: 'Pediatrics',       date: '15 Mar 2026', time: '02:00 PM', status: 'pending',   condition: 'Fever'         },
  { id: 4, patient: 'Mary Nziza',  doctor: 'Dr. Alice Mukamana',  department: 'Cardiology',       date: '10 Mar 2026', time: '11:00 AM', status: 'completed', condition: 'Checkup'       },
  { id: 5, patient: 'Paul Habim.', doctor: 'Dr. Eric Ndayambaje', department: 'Orthopedics',      date: '16 Mar 2026', time: '03:00 PM', status: 'cancelled', condition: 'Knee pain'     },
];

const BLANK_DOCTOR = { name: '', specialty: '', department: '', phone: '', email: '', experience: '', status: 'active' };
const BLANK_INFO   = { name: '', email: '', phone: '', address: '', licence: '', opening_hours: '', closing_hours: '', is_active: true };

export default function HospitalOperatorDashboard() {
  const [tab, setTab]         = useState('overview');
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState({});
  const [filter, setFilter]   = useState('all');
  const [search, setSearch]   = useState('');

  const [doctors, setDoctors]   = useState(INIT_DOCTORS);
  const [bookings, setBookings] = useState(INIT_BOOKINGS);

  const [hospital, setHospital] = useState({
    name:          'King Faisal Hospital',
    email:         'info@kfh.rw',
    phone:         '+250788300100',
    address:       'KG 544 St, Kigali, Rwanda',
    licence:       'RW-HOSP-001',
    opening_hours: '07:00 AM',
    closing_hours: '09:00 PM',
    is_active:     true,
  });

  const closeModal = () => setModal(null);

  // ── Doctor CRUD ─────────────────────────────────────────────
  const openAddDoctor  = () => { setForm({ ...BLANK_DOCTOR }); setModal({ type: 'doctor' }); };
  const openEditDoctor = (doc) => { setForm({ ...doc }); setModal({ type: 'doctor', id: doc.id }); };

  const saveDoctor = () => {
    if (!form.name || !form.specialty) return;
    if (modal.id) {
      setDoctors(d => d.map(x => x.id === modal.id ? { ...form, id: modal.id } : x));
    } else {
      setDoctors(d => [...d, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteDoctor = (id) => {
    if (window.confirm('Remove this doctor?')) setDoctors(d => d.filter(x => x.id !== id));
  };

  // ── Booking actions ──────────────────────────────────────────
  const updateBooking = (id, status) =>
    setBookings(b => b.map(x => x.id === id ? { ...x, status } : x));

  const deleteBooking = (id) => {
    if (window.confirm('Delete this booking?')) setBookings(b => b.filter(x => x.id !== id));
  };

  // ── Hospital info edit ───────────────────────────────────────
  const openEditHospital = () => { setForm({ ...hospital }); setModal({ type: 'hospital' }); };
  const saveHospital     = () => { setHospital({ ...form }); closeModal(); };

  // ── Filtered lists ───────────────────────────────────────────
  const filteredDoctors = doctors.filter(d => {
    const matchFilter = filter === 'all' || d.status === filter;
    const matchSearch = !search || JSON.stringify(d).toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const filteredBookings = bookings.filter(b => {
    const matchFilter = filter === 'all' || b.status === filter;
    const matchSearch = !search || JSON.stringify(b).toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const fld = (key, label, type = 'text', opts = null) => (
    <div className="ho-field" key={key}>
      <label>{label}</label>
      {opts ? (
        <select value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}>
          {opts.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
      ) : (
        <input type={type} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
      )}
    </div>
  );

  const DEPARTMENTS = ['Cardiology','Internal Medicine','Emergency Medicine','General Surgery','Pediatrics','Obstetrics & Gynecology','Orthopedics','Neurology','Oncology','Dermatology','Ophthalmology','Ear Nose & Throat (ENT)','Radiology','Intensive Care Unit','Laboratory','Pharmacy'];

  const stats = [
    { icon: '👨‍⚕️', label: 'Doctors',       num: doctors.length },
    { icon: '✅',   label: 'Active Doctors', num: doctors.filter(d => d.status === 'active').length },
    { icon: '📅',   label: 'Bookings',       num: bookings.length },
    { icon: '⏳',   label: 'Pending',         num: bookings.filter(b => b.status === 'pending').length },
    { icon: '✔️',   label: 'Confirmed',       num: bookings.filter(b => b.status === 'confirmed').length },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="ho-wrap">

        {/* ── Nav ── */}
        <nav className="ho-nav">
          <div className="ho-nav-logo">Health<span>Admin</span></div>
          <div className="ho-nav-tabs">
            {[
              { key: 'overview',  label: '⊞ Overview'  },
              { key: 'doctors',   label: '👨‍⚕️ Doctors'   },
              { key: 'bookings',  label: '📅 Bookings'  },
              { key: 'hospital',  label: '🏥 Hospital'  },
            ].map(t => (
              <button
                key={t.key}
                className={`ho-nav-tab ${tab === t.key ? 'active' : ''}`}
                onClick={() => { setTab(t.key); setFilter('all'); setSearch(''); }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="ho-nav-right">
            <div className="ho-avatar">HA</div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="ho-hero">
          <div className="ho-hero-deco" />
          <div className="ho-hero-content">
            <p className="ho-hero-label">Hospital Operator Dashboard</p>
            <h1 className="ho-hero-name">{hospital.name}</h1>
            <p className="ho-hero-sub">{hospital.address} · {hospital.phone}</p>
            <div className="ho-hero-pills">
              <span className="ho-pill">📋 {hospital.licence}</span>
              <span className="ho-pill">🕐 {hospital.opening_hours} – {hospital.closing_hours}</span>
              <span className={`ho-pill ${hospital.is_active ? 'green' : 'orange'}`}>
                {hospital.is_active ? '🟢 Active' : '🔴 Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="ho-body">

          {/* Mobile tab switcher */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { key: 'overview', label: '⊞ Overview'  },
              { key: 'doctors',  label: '👨‍⚕️ Doctors'   },
              { key: 'bookings', label: '📅 Bookings'  },
              { key: 'hospital', label: '🏥 Hospital'  },
            ].map(t => (
              <button
                key={t.key}
                className={`ho-filter-btn ${tab === t.key ? 'active' : ''}`}
                onClick={() => { setTab(t.key); setFilter('all'); setSearch(''); }}
                style={{ fontSize: 13 }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ══ OVERVIEW ══ */}
          {tab === 'overview' && (
            <>
              <div className="ho-stats">
                {stats.map((s, i) => (
                  <div className="ho-stat-card" key={s.label} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                    <div className="ho-stat-num">{s.num}</div>
                    <div className="ho-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="ho-section-label">🏥 Hospital Information</p>
              <div className="ho-grid-2">
                <div className="ho-card">
                  <div className="ho-card-title">
                    📋 Details
                    <button className="ho-btn ghost sm" onClick={openEditHospital}>✏️ Edit</button>
                  </div>
                  {[
                    { label: 'Name',           value: hospital.name          },
                    { label: 'Email',          value: hospital.email         },
                    { label: 'Phone',          value: hospital.phone         },
                    { label: 'Address',        value: hospital.address       },
                    { label: 'Licence',        value: hospital.licence       },
                    { label: 'Opening Hours',  value: hospital.opening_hours },
                    { label: 'Closing Hours',  value: hospital.closing_hours },
                  ].map(r => (
                    <div className="ho-info-row" key={r.label}>
                      <span className="ho-info-label">{r.label}</span>
                      <span className="ho-info-value" style={{ fontSize: 13, textAlign: 'right', maxWidth: '60%' }}>{r.value}</span>
                    </div>
                  ))}
                </div>

                <div className="ho-card">
                  <div className="ho-card-title">📅 Recent Bookings</div>
                  {bookings.slice(0, 5).map(b => (
                    <div className="ho-info-row" key={b.id}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{b.patient}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.doctor} · {b.date}</div>
                      </div>
                      <span className={`chip ${b.status}`}>{b.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="ho-section-label">👨‍⚕️ Doctors Overview</p>
              <div className="ho-doc-grid">
                {doctors.slice(0, 4).map((doc, i) => (
                  <div className="ho-doc-card" key={doc.id} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ho-doc-avatar">{doc.name.charAt(4)}</div>
                    <div className="ho-doc-name">{doc.name}</div>
                    <div className="ho-doc-spec">{doc.specialty}</div>
                    <div className="ho-doc-dept">{doc.department}</div>
                    <span className={`chip ${doc.status}`}>{doc.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ DOCTORS ══ */}
          {tab === 'doctors' && (
            <>
              <p className="ho-section-label">👨‍⚕️ Manage Doctors</p>
              <div className="ho-table-wrap">
                <div className="ho-table-top">
                  <span className="ho-table-title">{filteredDoctors.length} doctors</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="ho-search">
                      <span className="ho-search-icon">🔍</span>
                      <input placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="ho-filters">
                      {['all', 'active', 'inactive'].map(f => (
                        <button key={f} className={`ho-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
                      ))}
                    </div>
                    <button className="ho-btn primary sm" onClick={openAddDoctor}>+ Add Doctor</button>
                  </div>
                </div>
                <table>
                  <thead><tr>
                    <th>Name</th><th>Specialty</th><th>Department</th><th>Phone</th><th>Experience</th><th>Status</th><th>Actions</th>
                  </tr></thead>
                  <tbody>
                    {filteredDoctors.length === 0 ? (
                      <tr><td colSpan={7} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>No doctors found.</td></tr>
                    ) : filteredDoctors.map(doc => (
                      <tr key={doc.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                              {doc.name.charAt(4)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600 }}>{doc.name}</div>
                              <div style={{ fontSize: 11, color: '#94a3b8' }}>{doc.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{doc.specialty}</td>
                        <td style={{ color: '#64748b' }}>{doc.department}</td>
                        <td style={{ color: '#64748b' }}>{doc.phone}</td>
                        <td style={{ color: '#64748b' }}>{doc.experience}</td>
                        <td><span className={`chip ${doc.status}`}>{doc.status}</span></td>
                        <td>
                          <div className="ho-actions">
                            <button className="ho-btn ghost xs" onClick={() => openEditDoctor(doc)}>✏️ Edit</button>
                            <button className="ho-btn danger xs" onClick={() => deleteDoctor(doc.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══ BOOKINGS ══ */}
          {tab === 'bookings' && (
            <>
              <p className="ho-section-label">📅 Manage Bookings</p>
              <div className="ho-table-wrap">
                <div className="ho-table-top">
                  <span className="ho-table-title">{filteredBookings.length} bookings</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="ho-search">
                      <span className="ho-search-icon">🔍</span>
                      <input placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="ho-filters">
                      {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                        <button key={f} className={`ho-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <table>
                  <thead><tr>
                    <th>Patient</th><th>Doctor</th><th>Department</th><th>Date</th><th>Time</th><th>Condition</th><th>Status</th><th>Actions</th>
                  </tr></thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr><td colSpan={8} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>No bookings found.</td></tr>
                    ) : filteredBookings.map(b => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 600 }}>{b.patient}</td>
                        <td style={{ color: '#64748b' }}>{b.doctor}</td>
                        <td style={{ color: '#64748b', fontSize: 12 }}>{b.department}</td>
                        <td>{b.date}</td>
                        <td style={{ color: '#64748b' }}>{b.time}</td>
                        <td style={{ color: '#64748b', fontSize: 12 }}>{b.condition}</td>
                        <td><span className={`chip ${b.status}`}>{b.status}</span></td>
                        <td>
                          <div className="ho-actions">
                            {b.status === 'pending' && <>
                              <button className="ho-btn success xs" onClick={() => updateBooking(b.id, 'confirmed')}>✓ Confirm</button>
                              <button className="ho-btn danger xs"  onClick={() => updateBooking(b.id, 'cancelled')}>✕</button>
                            </>}
                            {b.status === 'confirmed' && (
                              <button className="ho-btn ghost xs" onClick={() => updateBooking(b.id, 'completed')}>✔ Done</button>
                            )}
                            <button className="ho-btn danger xs" onClick={() => deleteBooking(b.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══ HOSPITAL INFO ══ */}
          {tab === 'hospital' && (
            <>
              <p className="ho-section-label">🏥 Hospital Information</p>
              <div className="ho-grid-2">
                <div className="ho-card">
                  <div className="ho-card-title">
                    📋 Details
                    <button className="ho-btn primary sm" onClick={openEditHospital}>✏️ Edit Info</button>
                  </div>
                  {[
                    { label: 'Hospital Name',  value: hospital.name          },
                    { label: 'Email',          value: hospital.email         },
                    { label: 'Phone',          value: hospital.phone         },
                    { label: 'Address',        value: hospital.address       },
                    { label: 'Licence',        value: hospital.licence       },
                    { label: 'Opening Hours',  value: hospital.opening_hours },
                    { label: 'Closing Hours',  value: hospital.closing_hours },
                    { label: 'Status',         value: hospital.is_active ? '🟢 Active' : '🔴 Inactive' },
                  ].map(r => (
                    <div className="ho-info-row" key={r.label}>
                      <span className="ho-info-label">{r.label}</span>
                      <span className="ho-info-value" style={{ fontSize: 13 }}>{r.value}</span>
                    </div>
                  ))}
                </div>

                <div className="ho-card">
                  <div className="ho-card-title">📊 Quick Stats</div>
                  {[
                    { label: 'Total Doctors',    value: doctors.length },
                    { label: 'Active Doctors',   value: doctors.filter(d => d.status === 'active').length },
                    { label: 'Total Bookings',   value: bookings.length },
                    { label: 'Pending Bookings', value: bookings.filter(b => b.status === 'pending').length },
                    { label: 'Confirmed',        value: bookings.filter(b => b.status === 'confirmed').length },
                    { label: 'Completed',        value: bookings.filter(b => b.status === 'completed').length },
                  ].map(r => (
                    <div className="ho-info-row" key={r.label}>
                      <span className="ho-info-label">{r.label}</span>
                      <span className="ho-info-value">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* ══ DOCTOR MODAL ══ */}
        {modal?.type === 'doctor' && (
          <div className="ho-overlay" onClick={closeModal}>
            <div className="ho-modal" onClick={e => e.stopPropagation()}>
              <p className="ho-modal-title">{modal.id ? 'Edit Doctor' : 'Add Doctor'}</p>
              {fld('name',       'Full Name')}
              {fld('specialty',  'Specialty')}
              {fld('department', 'Department', 'text', DEPARTMENTS)}
              {fld('phone',      'Phone',      'tel')}
              {fld('email',      'Email',      'email')}
              {fld('experience', 'Experience (e.g. 5 years)')}
              {fld('status',     'Status',     'text', ['active', 'inactive'])}
              <div className="ho-modal-btns">
                <button className="ho-btn ghost" onClick={closeModal}>Cancel</button>
                <button className="ho-btn primary" onClick={saveDoctor}>
                  {modal.id ? 'Save Changes' : 'Add Doctor'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ HOSPITAL EDIT MODAL ══ */}
        {modal?.type === 'hospital' && (
          <div className="ho-overlay" onClick={closeModal}>
            <div className="ho-modal" onClick={e => e.stopPropagation()}>
              <p className="ho-modal-title">Edit Hospital Info</p>
              {fld('name',          'Hospital Name')}
              {fld('email',         'Email',         'email')}
              {fld('phone',         'Phone',         'tel')}
              {fld('address',       'Address')}
              {fld('licence',       'Licence Number')}
              {fld('opening_hours', 'Opening Hours')}
              {fld('closing_hours', 'Closing Hours')}
              {fld('is_active',     'Status', 'text', [
                { value: true,  label: 'Active'   },
                { value: false, label: 'Inactive' },
              ])}
              <div className="ho-modal-btns">
                <button className="ho-btn ghost" onClick={closeModal}>Cancel</button>
                <button className="ho-btn primary" onClick={saveHospital}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}