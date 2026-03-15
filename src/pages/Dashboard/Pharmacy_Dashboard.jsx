import React, { useState } from "react";

// ─── CSS (matching HospitalOperatorDashboard style) ───────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .po-wrap {
    min-height: 100vh;
    background: #f0f4ff;
    font-family: 'Outfit', sans-serif;
    color: #1e2233;
  }

  /* ── Nav ── */
  .po-nav {
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
  .po-nav-logo { font-family: 'Lora', serif; font-size: 20px; color: #fff; }
  .po-nav-logo span { color: #34d399; }
  .po-nav-right { display: flex; align-items: center; gap: 10px; }
  .po-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #34d399);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 700; color: #fff;
    border: 2px solid rgba(255,255,255,0.2);
  }
  .po-nav-tabs {
    display: flex; gap: 2px;
    background: rgba(255,255,255,0.07);
    border-radius: 10px; padding: 3px;
  }
  .po-nav-tab {
    padding: 6px 14px; border-radius: 8px; border: none;
    background: none; color: rgba(255,255,255,0.5);
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.18s;
  }
  .po-nav-tab.active { background: rgba(255,255,255,0.12); color: #fff; font-weight: 600; }

  /* ── Hero ── */
  .po-hero {
    background: linear-gradient(135deg, #1e2233 0%, #064e3b 50%, #065f46 100%);
    padding: 36px 32px 48px;
    position: relative; overflow: hidden;
  }
  .po-hero::after {
    content: ''; position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 32px; background: #f0f4ff;
    border-radius: 32px 32px 0 0;
  }
  .po-hero-deco {
    position: absolute; top: -30px; right: -30px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(52,211,153,0.07);
    border: 1px solid rgba(52,211,153,0.1);
  }
  .po-hero-deco::after {
    content: ''; position: absolute;
    top: 28px; left: 28px; right: 28px; bottom: 28px;
    border-radius: 50%; background: rgba(52,211,153,0.05);
    border: 1px solid rgba(52,211,153,0.08);
  }
  .po-hero-content { position: relative; z-index: 1; }
  .po-hero-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.4);
    margin-bottom: 6px;
  }
  .po-hero-name {
    font-family: 'Lora', serif; font-size: 32px; color: #fff;
    margin-bottom: 6px; line-height: 1.2;
  }
  .po-hero-sub { font-size: 13px; color: rgba(255,255,255,0.45); margin-bottom: 18px; }
  .po-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .po-pill {
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.14);
    color: #fff; font-size: 12px; font-weight: 500;
    padding: 4px 13px; border-radius: 999px; backdrop-filter: blur(8px);
  }
  .po-pill.green  { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.25); color: #6ee7b7; }
  .po-pill.orange { background: rgba(251,146,60,0.15);  border-color: rgba(251,146,60,0.25);  color: #fdba74; }
  .po-pill.red    { background: rgba(244,63,94,0.15);   border-color: rgba(244,63,94,0.25);   color: #fda4af; }

  /* ── Body ── */
  .po-body { max-width: 1100px; margin: 0 auto; padding: 28px 20px 80px; }

  /* ── Section label ── */
  .po-section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: #94a3b8;
    margin-bottom: 14px; margin-top: 32px;
    display: flex; align-items: center; gap: 8px;
  }
  .po-section-label::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }

  /* ── Stats ── */
  .po-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px; margin-bottom: 4px;
  }
  .po-stat-card {
    background: #fff; border-radius: 16px; padding: 16px;
    text-align: center; border: 1px solid #e8edf5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    animation: fadeUp 0.4s ease both;
  }
  .po-stat-num {
    font-family: 'Lora', serif; font-size: 30px;
    color: #1e2233; line-height: 1; margin-bottom: 4px;
  }
  .po-stat-label { font-size: 11px; color: #94a3b8; font-weight: 500; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Cards ── */
  .po-card {
    background: #fff; border-radius: 20px; padding: 22px 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    border: 1px solid #e8edf5; animation: fadeUp 0.4s ease both;
  }
  .po-card-title {
    font-size: 13px; font-weight: 600; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.07em;
    margin-bottom: 16px; display: flex;
    justify-content: space-between; align-items: center;
  }
  .po-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }

  /* ── Info row ── */
  .po-info-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px;
  }
  .po-info-row:last-child { border-bottom: none; }
  .po-info-label { color: #94a3b8; font-weight: 500; }
  .po-info-value { font-weight: 600; color: #1e2233; }

  /* ── Buttons ── */
  .po-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 8px 16px; border-radius: 10px; border: none;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: opacity 0.18s, transform 0.15s;
  }
  .po-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .po-btn.primary { background: linear-gradient(135deg, #10b981, #34d399); color: #fff; }
  .po-btn.success { background: linear-gradient(135deg, #3b82f6, #60a5fa); color: #fff; }
  .po-btn.danger  { background: #fee2e2; color: #dc2626; }
  .po-btn.ghost   { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
  .po-btn.warning { background: #fef3c7; color: #d97706; }
  .po-btn.sm      { padding: 5px 11px; font-size: 12px; }
  .po-btn.xs      { padding: 3px 9px; font-size: 11px; border-radius: 8px; }

  /* ── Table ── */
  .po-table-wrap {
    background: #fff; border-radius: 20px; overflow: hidden;
    border: 1px solid #e8edf5; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    animation: fadeUp 0.4s ease both;
  }
  .po-table-top {
    padding: 16px 20px; border-bottom: 1px solid #f1f5f9;
    display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .po-table-title { font-size: 14px; font-weight: 700; color: #1e2233; }
  .po-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .po-filter-btn {
    padding: 5px 12px; border-radius: 8px; border: 1px solid #e2e8f0;
    background: none; color: #94a3b8; font-size: 12px; font-weight: 500;
    font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.18s;
  }
  .po-filter-btn.active, .po-filter-btn:hover {
    background: #f0fdf4; color: #10b981; border-color: #a7f3d0;
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
  tbody tr:hover td { background: #f9fffe; }

  /* ── Chips ── */
  .chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 999px;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .chip::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .chip.available, .chip.active,  .chip.completed, .chip.delivered { background: #dcfce7; color: #16a34a; }
  .chip.pending,   .chip.upcoming, .chip.processing               { background: #fef3c7; color: #d97706; }
  .chip.inactive,  .chip.cancelled, .chip.out_of_stock             { background: #fee2e2; color: #dc2626; }
  .chip.confirmed                                                   { background: #dbeafe; color: #2563eb; }

  /* ── Medicine card grid ── */
  .po-med-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
  .po-med-card {
    background: #fff; border-radius: 18px; padding: 18px 20px;
    border: 1px solid #e8edf5; box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    animation: fadeUp 0.4s ease both; transition: transform 0.2s;
  }
  .po-med-card:hover { transform: translateY(-3px); }
  .po-med-icon {
    width: 44px; height: 44px; border-radius: 12px; margin-bottom: 12px;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .po-med-name  { font-size: 14px; font-weight: 700; color: #1e2233; margin-bottom: 2px; }
  .po-med-gen   { font-size: 11px; color: #94a3b8; margin-bottom: 8px; }
  .po-med-price { font-family: 'Lora', serif; font-size: 18px; font-weight: 600; color: #10b981; margin-bottom: 4px; }
  .po-med-row   { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
  .po-stock     { font-size: 12px; color: #64748b; }
  .po-stock.low { color: #dc2626; font-weight: 600; }
  .po-med-actions { display: flex; gap: 5px; margin-top: 12px; }

  /* ── Staff card ── */
  .po-staff-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .po-staff-card {
    background: #fff; border-radius: 18px; padding: 20px;
    border: 1px solid #e8edf5; text-align: center;
    animation: fadeUp 0.4s ease both; transition: transform 0.2s;
  }
  .po-staff-card:hover { transform: translateY(-3px); }
  .po-staff-avatar {
    width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 12px;
    background: linear-gradient(135deg, #10b981, #34d399);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 800; color: #fff;
  }
  .po-staff-name { font-size: 14px; font-weight: 700; color: #1e2233; margin-bottom: 2px; }
  .po-staff-role { font-size: 12px; color: #64748b; margin-bottom: 8px; }
  .po-staff-actions { display: flex; gap: 5px; justify-content: center; }

  /* ── Modal ── */
  .po-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(5px);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 20px;
  }
  .po-modal {
    background: #fff; border-radius: 24px; padding: 32px;
    width: 100%; max-width: 460px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    animation: fadeUp 0.3s ease both;
    max-height: 90vh; overflow-y: auto;
  }
  .po-modal-title {
    font-family: 'Lora', serif; font-size: 22px;
    margin-bottom: 24px; color: #1e2233;
  }
  .po-field { margin-bottom: 15px; }
  .po-field label {
    display: block; font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #94a3b8; margin-bottom: 6px;
  }
  .po-field input, .po-field select, .po-field textarea {
    width: 100%; padding: 10px 14px;
    border: 1px solid #e2e8f0; border-radius: 12px;
    font-family: 'Outfit', sans-serif; font-size: 14px; color: #1e2233;
    outline: none; transition: border-color 0.2s; background: #fff;
  }
  .po-field input:focus, .po-field select:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }
  .po-field textarea { resize: vertical; min-height: 72px; }
  .po-modal-btns { display: flex; gap: 10px; margin-top: 24px; }
  .po-modal-btns .po-btn { flex: 1; justify-content: center; padding: 12px; font-size: 14px; }

  /* ── Search ── */
  .po-search { position: relative; max-width: 280px; }
  .po-search input {
    width: 100%; padding: 8px 12px 8px 34px;
    border: 1px solid #e2e8f0; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 13px; color: #1e2233;
    outline: none; transition: border-color 0.2s; background: #fff;
  }
  .po-search input:focus { border-color: #10b981; }
  .po-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); font-size: 14px; opacity: 0.35; }

  .po-actions { display: flex; gap: 5px; }

  /* ── Low stock badge ── */
  .po-low-stock-banner {
    background: #fef3c7; border: 1px solid #fde68a;
    border-radius: 12px; padding: 12px 16px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: #92400e; margin-bottom: 20px;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    .po-hero { padding: 24px 16px 40px; }
    .po-hero-name { font-size: 24px; }
    .po-body { padding: 20px 12px 60px; }
    .po-nav { padding: 0 14px; }
    .po-nav-tabs { display: none; }
  }
`;

// ─── Sample data ──────────────────────────────────────────────────────────────
const INIT_MEDICINES = [
  { id: 1, name: 'Amoxicillin',      generic_name: 'Amoxicillin Trihydrate', category: 'Antibiotic',             price: 1500, stock: 200, unit: 'tablet',  requires_prescription: true,  is_available: true  },
  { id: 2, name: 'Paracetamol',      generic_name: 'Acetaminophen',          category: 'Painkiller',             price: 500,  stock: 500, unit: 'tablet',  requires_prescription: false, is_available: true  },
  { id: 3, name: 'Ibuprofen',        generic_name: 'Ibuprofen',              category: 'Painkiller',             price: 800,  stock: 8,   unit: 'tablet',  requires_prescription: false, is_available: true  },
  { id: 4, name: 'Metformin',        generic_name: 'Metformin HCl',          category: 'Diabetes',               price: 2000, stock: 150, unit: 'tablet',  requires_prescription: true,  is_available: true  },
  { id: 5, name: 'Salbutamol',       generic_name: 'Albuterol',              category: 'Respiratory',            price: 3500, stock: 0,   unit: 'inhaler', requires_prescription: true,  is_available: false },
  { id: 6, name: 'Vitamin C 1000mg', generic_name: 'Ascorbic Acid',          category: 'Vitamins & Supplements', price: 600,  stock: 400, unit: 'tablet',  requires_prescription: false, is_available: true  },
];

const INIT_ORDERS = [
  { id: 1, patient: 'John Doe',    medicine: 'Metformin',        qty: 2, price: 4000,  status: 'pending',    date: '14 Mar 2026', phone: '+250788001001' },
  { id: 2, patient: 'Alice Uwera', medicine: 'Paracetamol',      qty: 3, price: 1500,  status: 'processing', date: '13 Mar 2026', phone: '+250788002002' },
  { id: 3, patient: 'Eric Mugabo', medicine: 'Salbutamol',       qty: 1, price: 3500,  status: 'delivered',  date: '12 Mar 2026', phone: '+250788003003' },
  { id: 4, patient: 'Mary Nziza',  medicine: 'Vitamin C 1000mg', qty: 2, price: 1200,  status: 'pending',    date: '14 Mar 2026', phone: '+250788004004' },
  { id: 5, patient: 'Paul Habim.', medicine: 'Amoxicillin',      qty: 1, price: 1500,  status: 'cancelled',  date: '11 Mar 2026', phone: '+250788005005' },
];

const INIT_STAFF = [
  { id: 1, name: 'Jean Pierre Mugisha', role: 'Head Pharmacist',   phone: '+250788500001', email: 'jp@pharmacy.rw',    status: 'active' },
  { id: 2, name: 'Claire Uwimana',      role: 'Pharmacist',        phone: '+250788500002', email: 'claire@pharmacy.rw', status: 'active' },
  { id: 3, name: 'Patrick Ndoli',       role: 'Pharmacy Technician',phone: '+250788500003',email: 'patrick@pharmacy.rw',status: 'active' },
];

const BLANK_MEDICINE = { name: '', generic_name: '', category: '', price: '', stock: '', unit: 'tablet', requires_prescription: false, is_available: true, description: '' };
const BLANK_STAFF    = { name: '', role: '', phone: '', email: '', status: 'active' };

const CATEGORIES = ['Antibiotic','Painkiller','Antiviral','Antifungal','Cardiovascular','Diabetes','Vitamins & Supplements','Dermatology','Respiratory','Gastrointestinal','Mental Health','Other'];
const UNITS      = ['tablet','capsule','syrup','injection','cream','drops','inhaler','patch','other'];

export default function PharmacyOperatorDashboard() {
  const [tab, setTab]       = useState('overview');
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState({});
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [medicines, setMedicines] = useState(INIT_MEDICINES);
  const [orders, setOrders]       = useState(INIT_ORDERS);
  const [staff, setStaff]         = useState(INIT_STAFF);

  const [pharmacy, setPharmacy] = useState({
    name:          'Chez Lando Pharmacy',
    email:         'info@chezlando.rw',
    phone:         '+250788400100',
    address:       'KG 7 Ave, Kigali, Rwanda',
    licence:       'RW-PHAR-001',
    opening_hours: '08:00 AM',
    closing_hours: '10:00 PM',
    is_active:     true,
  });

  const closeModal = () => setModal(null);

  // ── Medicine CRUD ────────────────────────────────────────────
  const openAddMedicine  = () => { setForm({ ...BLANK_MEDICINE }); setModal({ type: 'medicine' }); };
  const openEditMedicine = (med) => { setForm({ ...med }); setModal({ type: 'medicine', id: med.id }); };
  const saveMedicine = () => {
    if (!form.name) return;
    if (modal.id) {
      setMedicines(m => m.map(x => x.id === modal.id ? { ...form, id: modal.id } : x));
    } else {
      setMedicines(m => [...m, { ...form, id: Date.now() }]);
    }
    closeModal();
  };
  const deleteMedicine = (id) => {
    if (window.confirm('Delete this medicine?')) setMedicines(m => m.filter(x => x.id !== id));
  };

  // ── Staff CRUD ───────────────────────────────────────────────
  const openAddStaff  = () => { setForm({ ...BLANK_STAFF }); setModal({ type: 'staff' }); };
  const openEditStaff = (s) => { setForm({ ...s }); setModal({ type: 'staff', id: s.id }); };
  const saveStaff = () => {
    if (!form.name) return;
    if (modal.id) {
      setStaff(s => s.map(x => x.id === modal.id ? { ...form, id: modal.id } : x));
    } else {
      setStaff(s => [...s, { ...form, id: Date.now() }]);
    }
    closeModal();
  };
  const deleteStaff = (id) => {
    if (window.confirm('Remove this staff member?')) setStaff(s => s.filter(x => x.id !== id));
  };

  // ── Order actions ────────────────────────────────────────────
  const updateOrder  = (id, status) => setOrders(o => o.map(x => x.id === id ? { ...x, status } : x));
  const deleteOrder  = (id) => { if (window.confirm('Delete this order?')) setOrders(o => o.filter(x => x.id !== id)); };

  // ── Pharmacy info edit ───────────────────────────────────────
  const openEditPharmacy = () => { setForm({ ...pharmacy }); setModal({ type: 'pharmacy' }); };
  const savePharmacy     = () => { setPharmacy({ ...form }); closeModal(); };

  // ── Filtered lists ───────────────────────────────────────────
  const filteredMedicines = medicines.filter(m => {
    const matchFilter = filter === 'all'
      || (filter === 'available'   &&  m.is_available)
      || (filter === 'unavailable' && !m.is_available)
      || (filter === 'low_stock'   &&  m.stock <= 10 && m.stock > 0)
      || (filter === 'out_of_stock'&&  m.stock === 0);
    const matchSearch = !search || JSON.stringify(m).toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const filteredOrders = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter;
    const matchSearch = !search || JSON.stringify(o).toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const fld = (key, label, type = 'text', opts = null) => (
    <div className="po-field" key={key}>
      <label>{label}</label>
      {opts ? (
        <select value={form[key] !== undefined ? String(form[key]) : ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}>
          {opts.map(o => <option key={o.value ?? o} value={String(o.value ?? o)}>{o.label ?? o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
      ) : (
        <input type={type} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
      )}
    </div>
  );

  const lowStockCount = medicines.filter(m => m.stock <= 10 && m.stock > 0).length;
  const outOfStock    = medicines.filter(m => m.stock === 0).length;

  const stats = [
    { icon: '💊', label: 'Medicines',   num: medicines.length },
    { icon: '✅', label: 'Available',   num: medicines.filter(m => m.is_available).length },
    { icon: '⚠️', label: 'Low Stock',   num: lowStockCount },
    { icon: '❌', label: 'Out of Stock',num: outOfStock },
    { icon: '🛒', label: 'Orders',      num: orders.length },
    { icon: '⏳', label: 'Pending',     num: orders.filter(o => o.status === 'pending').length },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="po-wrap">

        {/* ── Nav ── */}
        <nav className="po-nav">
          <div className="po-nav-logo">Pharma<span>Admin</span></div>
          <div className="po-nav-tabs">
            {[
              { key: 'overview',  label: '⊞ Overview'  },
              { key: 'medicines', label: '💊 Medicines' },
              { key: 'orders',    label: '🛒 Orders'    },
              { key: 'staff',     label: '👨‍⚕️ Staff'     },
              { key: 'pharmacy',  label: '🏪 Pharmacy'  },
            ].map(t => (
              <button
                key={t.key}
                className={`po-nav-tab ${tab === t.key ? 'active' : ''}`}
                onClick={() => { setTab(t.key); setFilter('all'); setSearch(''); }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="po-nav-right">
            <div className="po-avatar">PA</div>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="po-hero">
          <div className="po-hero-deco" />
          <div className="po-hero-content">
            <p className="po-hero-label">Pharmacy Operator Dashboard</p>
            <h1 className="po-hero-name">{pharmacy.name}</h1>
            <p className="po-hero-sub">{pharmacy.address} · {pharmacy.phone}</p>
            <div className="po-hero-pills">
              <span className="po-pill">📋 {pharmacy.licence}</span>
              <span className="po-pill">🕐 {pharmacy.opening_hours} – {pharmacy.closing_hours}</span>
              <span className={`po-pill ${pharmacy.is_active ? 'green' : 'orange'}`}>
                {pharmacy.is_active ? '🟢 Open' : '🔴 Closed'}
              </span>
              {outOfStock > 0 && <span className="po-pill red">⚠️ {outOfStock} Out of Stock</span>}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="po-body">

          {/* Mobile tab switcher */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { key: 'overview',  label: '⊞ Overview'  },
              { key: 'medicines', label: '💊 Medicines' },
              { key: 'orders',    label: '🛒 Orders'    },
              { key: 'staff',     label: '👨‍⚕️ Staff'     },
              { key: 'pharmacy',  label: '🏪 Pharmacy'  },
            ].map(t => (
              <button
                key={t.key}
                className={`po-filter-btn ${tab === t.key ? 'active' : ''}`}
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
              <div className="po-stats">
                {stats.map((s, i) => (
                  <div className="po-stat-card" key={s.label} style={{ animationDelay: `${i * 0.06}s` }}>
                    <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                    <div className="po-stat-num">{s.num}</div>
                    <div className="po-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Low stock alert */}
              {(lowStockCount > 0 || outOfStock > 0) && (
                <div className="po-low-stock-banner">
                  ⚠️ <strong>{outOfStock} medicine(s) out of stock</strong> and <strong>{lowStockCount} medicine(s) running low</strong>. Please restock soon.
                </div>
              )}

              <div className="po-grid-2">
                {/* Pharmacy info */}
                <div className="po-card">
                  <div className="po-card-title">
                    🏪 Pharmacy Info
                    <button className="po-btn ghost sm" onClick={openEditPharmacy}>✏️ Edit</button>
                  </div>
                  {[
                    { label: 'Name',    value: pharmacy.name          },
                    { label: 'Email',   value: pharmacy.email         },
                    { label: 'Phone',   value: pharmacy.phone         },
                    { label: 'Address', value: pharmacy.address       },
                    { label: 'Opens',   value: pharmacy.opening_hours },
                    { label: 'Closes',  value: pharmacy.closing_hours },
                  ].map(r => (
                    <div className="po-info-row" key={r.label}>
                      <span className="po-info-label">{r.label}</span>
                      <span className="po-info-value" style={{ fontSize: 13 }}>{r.value}</span>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="po-card">
                  <div className="po-card-title">🛒 Recent Orders</div>
                  {orders.slice(0, 5).map(o => (
                    <div className="po-info-row" key={o.id}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{o.patient}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{o.medicine} · {o.date}</div>
                      </div>
                      <span className={`chip ${o.status}`}>{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medicine overview */}
              <p className="po-section-label">💊 Medicine Overview</p>
              <div className="po-med-grid">
                {medicines.slice(0, 4).map((med, i) => (
                  <div className="po-med-card" key={med.id} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="po-med-icon">💊</div>
                    <div className="po-med-name">{med.name}</div>
                    <div className="po-med-gen">{med.generic_name}</div>
                    <div className="po-med-price">RWF {Number(med.price).toLocaleString()}</div>
                    <div className="po-med-row">
                      <span className={`po-stock ${med.stock <= 10 ? 'low' : ''}`}>
                        {med.stock === 0 ? '❌ Out of stock' : `Stock: ${med.stock}`}
                      </span>
                      <span className={`chip ${med.is_available ? 'available' : 'inactive'}`}>
                        {med.is_available ? 'In stock' : 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ MEDICINES ══ */}
          {tab === 'medicines' && (
            <>
              <p className="po-section-label">💊 Manage Medicines</p>

              {(lowStockCount > 0 || outOfStock > 0) && (
                <div className="po-low-stock-banner">
                  ⚠️ <strong>{outOfStock} out of stock</strong>, <strong>{lowStockCount} low stock</strong> — restock needed.
                </div>
              )}

              <div className="po-table-wrap">
                <div className="po-table-top">
                  <span className="po-table-title">{filteredMedicines.length} medicines</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="po-search">
                      <span className="po-search-icon">🔍</span>
                      <input placeholder="Search medicines..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="po-filters">
                      {['all','available','unavailable','low_stock','out_of_stock'].map(f => (
                        <button key={f} className={`po-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                          {f.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                    <button className="po-btn primary sm" onClick={openAddMedicine}>+ Add Medicine</button>
                  </div>
                </div>
                <table>
                  <thead><tr>
                    <th>Name</th><th>Category</th><th>Price (RWF)</th><th>Stock</th><th>Unit</th><th>Rx</th><th>Status</th><th>Actions</th>
                  </tr></thead>
                  <tbody>
                    {filteredMedicines.length === 0 ? (
                      <tr><td colSpan={8} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>No medicines found.</td></tr>
                    ) : filteredMedicines.map(med => (
                      <tr key={med.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{med.name}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>{med.generic_name}</div>
                        </td>
                        <td style={{ color: '#64748b' }}>{med.category}</td>
                        <td style={{ fontWeight: 600, color: '#10b981' }}>{Number(med.price).toLocaleString()}</td>
                        <td>
                          <span style={{
                            fontWeight: 600,
                            color: med.stock === 0 ? '#dc2626' : med.stock <= 10 ? '#d97706' : '#16a34a'
                          }}>
                            {med.stock === 0 ? '❌ 0' : med.stock <= 10 ? `⚠️ ${med.stock}` : med.stock}
                          </span>
                        </td>
                        <td style={{ color: '#64748b' }}>{med.unit}</td>
                        <td>{med.requires_prescription ? <span className="chip pending">Rx</span> : <span style={{ color: '#94a3b8', fontSize: 12 }}>OTC</span>}</td>
                        <td><span className={`chip ${med.is_available ? 'available' : 'inactive'}`}>{med.is_available ? 'Available' : 'Unavailable'}</span></td>
                        <td>
                          <div className="po-actions">
                            <button className="po-btn ghost xs" onClick={() => openEditMedicine(med)}>✏️ Edit</button>
                            <button className="po-btn danger xs" onClick={() => deleteMedicine(med.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══ ORDERS ══ */}
          {tab === 'orders' && (
            <>
              <p className="po-section-label">🛒 Manage Orders</p>
              <div className="po-table-wrap">
                <div className="po-table-top">
                  <span className="po-table-title">{filteredOrders.length} orders</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="po-search">
                      <span className="po-search-icon">🔍</span>
                      <input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="po-filters">
                      {['all','pending','processing','delivered','cancelled'].map(f => (
                        <button key={f} className={`po-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <table>
                  <thead><tr>
                    <th>Patient</th><th>Phone</th><th>Medicine</th><th>Qty</th><th>Price (RWF)</th><th>Date</th><th>Status</th><th>Actions</th>
                  </tr></thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr><td colSpan={8} style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>No orders found.</td></tr>
                    ) : filteredOrders.map(o => (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 600 }}>{o.patient}</td>
                        <td style={{ color: '#64748b', fontSize: 12 }}>{o.phone}</td>
                        <td>{o.medicine}</td>
                        <td style={{ color: '#64748b' }}>{o.qty}</td>
                        <td style={{ fontWeight: 600, color: '#10b981' }}>{Number(o.price).toLocaleString()}</td>
                        <td style={{ color: '#64748b' }}>{o.date}</td>
                        <td><span className={`chip ${o.status}`}>{o.status}</span></td>
                        <td>
                          <div className="po-actions">
                            {o.status === 'pending'    && <button className="po-btn success xs" onClick={() => updateOrder(o.id, 'processing')}>▶ Process</button>}
                            {o.status === 'processing' && <button className="po-btn primary xs" onClick={() => updateOrder(o.id, 'delivered')}>✓ Deliver</button>}
                            {o.status === 'pending'    && <button className="po-btn danger xs"  onClick={() => updateOrder(o.id, 'cancelled')}>✕</button>}
                            <button className="po-btn danger xs" onClick={() => deleteOrder(o.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══ STAFF ══ */}
          {tab === 'staff' && (
            <>
              <p className="po-section-label">👨‍⚕️ Manage Staff</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <button className="po-btn primary sm" onClick={openAddStaff}>+ Add Staff</button>
              </div>
              <div className="po-staff-grid">
                {staff.map((s, i) => (
                  <div className="po-staff-card" key={s.id} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="po-staff-avatar">{s.name.charAt(0)}</div>
                    <div className="po-staff-name">{s.name}</div>
                    <div className="po-staff-role">{s.role}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>📞 {s.phone}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>✉️ {s.email}</div>
                    <span className={`chip ${s.status}`} style={{ marginBottom: 12 }}>{s.status}</span>
                    <div className="po-staff-actions">
                      <button className="po-btn ghost xs" onClick={() => openEditStaff(s)}>✏️ Edit</button>
                      <button className="po-btn danger xs" onClick={() => deleteStaff(s.id)}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ PHARMACY INFO ══ */}
          {tab === 'pharmacy' && (
            <>
              <p className="po-section-label">🏪 Pharmacy Information</p>
              <div className="po-grid-2">
                <div className="po-card">
                  <div className="po-card-title">
                    📋 Details
                    <button className="po-btn primary sm" onClick={openEditPharmacy}>✏️ Edit Info</button>
                  </div>
                  {[
                    { label: 'Name',          value: pharmacy.name          },
                    { label: 'Email',         value: pharmacy.email         },
                    { label: 'Phone',         value: pharmacy.phone         },
                    { label: 'Address',       value: pharmacy.address       },
                    { label: 'Licence',       value: pharmacy.licence       },
                    { label: 'Opening Hours', value: pharmacy.opening_hours },
                    { label: 'Closing Hours', value: pharmacy.closing_hours },
                    { label: 'Status',        value: pharmacy.is_active ? '🟢 Open' : '🔴 Closed' },
                  ].map(r => (
                    <div className="po-info-row" key={r.label}>
                      <span className="po-info-label">{r.label}</span>
                      <span className="po-info-value" style={{ fontSize: 13 }}>{r.value}</span>
                    </div>
                  ))}
                </div>

                <div className="po-card">
                  <div className="po-card-title">📊 Quick Stats</div>
                  {[
                    { label: 'Total Medicines',   value: medicines.length },
                    { label: 'Available',         value: medicines.filter(m => m.is_available).length },
                    { label: 'Out of Stock',      value: outOfStock },
                    { label: 'Low Stock',         value: lowStockCount },
                    { label: 'Total Orders',      value: orders.length },
                    { label: 'Pending Orders',    value: orders.filter(o => o.status === 'pending').length },
                    { label: 'Delivered Orders',  value: orders.filter(o => o.status === 'delivered').length },
                    { label: 'Staff Members',     value: staff.length },
                  ].map(r => (
                    <div className="po-info-row" key={r.label}>
                      <span className="po-info-label">{r.label}</span>
                      <span className="po-info-value">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* ══ MEDICINE MODAL ══ */}
        {modal?.type === 'medicine' && (
          <div className="po-overlay" onClick={closeModal}>
            <div className="po-modal" onClick={e => e.stopPropagation()}>
              <p className="po-modal-title">{modal.id ? 'Edit Medicine' : 'Add Medicine'}</p>
              {fld('name',         'Medicine Name')}
              {fld('generic_name', 'Generic Name')}
              {fld('category',     'Category',   'text', CATEGORIES)}
              {fld('price',        'Price (RWF)', 'number')}
              {fld('stock',        'Stock',       'number')}
              {fld('unit',         'Unit',        'text', UNITS)}
              {fld('requires_prescription', 'Prescription Required', 'text', [
                { value: 'false', label: 'No (OTC)' },
                { value: 'true',  label: 'Yes (Rx)' },
              ])}
              {fld('is_available', 'Availability', 'text', [
                { value: 'true',  label: 'Available'   },
                { value: 'false', label: 'Unavailable' },
              ])}
              {fld('description', 'Description', 'textarea')}
              <div className="po-modal-btns">
                <button className="po-btn ghost" onClick={closeModal}>Cancel</button>
                <button className="po-btn primary" onClick={saveMedicine}>
                  {modal.id ? 'Save Changes' : 'Add Medicine'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ STAFF MODAL ══ */}
        {modal?.type === 'staff' && (
          <div className="po-overlay" onClick={closeModal}>
            <div className="po-modal" onClick={e => e.stopPropagation()}>
              <p className="po-modal-title">{modal.id ? 'Edit Staff' : 'Add Staff'}</p>
              {fld('name',   'Full Name')}
              {fld('role',   'Role', 'text', ['Head Pharmacist','Pharmacist','Pharmacy Technician','Cashier','Delivery Staff'])}
              {fld('phone',  'Phone', 'tel')}
              {fld('email',  'Email', 'email')}
              {fld('status', 'Status', 'text', ['active', 'inactive'])}
              <div className="po-modal-btns">
                <button className="po-btn ghost" onClick={closeModal}>Cancel</button>
                <button className="po-btn primary" onClick={saveStaff}>
                  {modal.id ? 'Save Changes' : 'Add Staff'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ PHARMACY EDIT MODAL ══ */}
        {modal?.type === 'pharmacy' && (
          <div className="po-overlay" onClick={closeModal}>
            <div className="po-modal" onClick={e => e.stopPropagation()}>
              <p className="po-modal-title">Edit Pharmacy Info</p>
              {fld('name',          'Pharmacy Name')}
              {fld('email',         'Email',         'email')}
              {fld('phone',         'Phone',         'tel')}
              {fld('address',       'Address')}
              {fld('licence',       'Licence Number')}
              {fld('opening_hours', 'Opening Hours')}
              {fld('closing_hours', 'Closing Hours')}
              {fld('is_active', 'Status', 'text', [
                { value: 'true',  label: 'Open'   },
                { value: 'false', label: 'Closed' },
              ])}
              <div className="po-modal-btns">
                <button className="po-btn ghost" onClick={closeModal}>Cancel</button>
                <button className="po-btn primary" onClick={savePharmacy}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}