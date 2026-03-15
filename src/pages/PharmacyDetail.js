import React, { useState, useEffect } from 'react';
import './PharmacyList.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:3500/api/v1';

const PharmacyDetail = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [pharmacy, setPharmacy]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [activeTab, setActiveTab] = useState('medicines');
  const [search, setSearch]       = useState('');

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        setLoading(true);
        const res  = await axios.get(`${API_BASE}/pharmacies/${id}`);
        const data = res.data?.data || res.data;
        setPharmacy(data);
      } catch (err) {
        console.error('fetchPharmacy error:', err);
        setError('Failed to load pharmacy details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacy();
  }, [id]);

  if (loading) return (
    <div className="pharmacy-container">
      <p className="user-location">Loading pharmacy details...</p>
    </div>
  );

  if (error || !pharmacy) return (
    <div className="pharmacy-container">
      <p style={{ color: 'red' }}>⚠️ {error || 'Pharmacy not found.'}</p>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Pharmacies</button>
    </div>
  );

  const medicines  = pharmacy.medicines  || [];
  const staff      = pharmacy.users      || [];
  const insurances = pharmacy.insurances || [];

  const filteredMeds = medicines.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.generic_name?.toLowerCase().includes(search.toLowerCase()) ||
    m.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pharmacy-container">

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Pharmacies
      </button>

      {/* Pharmacy header */}
      <div className="pharmacy-card" style={{ display: 'flex', gap: 20, marginBottom: 28, cursor: 'default' }}>
        <img
          src={pharmacy.image || '/images/pharmacy1.jpg'}
          alt={pharmacy.name}
          style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
        />
        <div className="pharmacy-info" style={{ flex: 1 }}>
          <h3>{pharmacy.name}</h3>
          <p>{pharmacy.address}</p>
          <p className="phone">📞 {pharmacy.phone}</p>
          {pharmacy.email && <p className="phone">✉️ {pharmacy.email}</p>}
          <p className="distance">
            {pharmacy.is_active
              ? <span style={{ color: '#2e7d32' }}>🟢 Open</span>
              : <span style={{ color: '#c62828' }}>🔴 Closed</span>
            }
          </p>
          {insurances.length > 0 && (
            <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {insurances.map(ins => (
                <span key={ins.id} style={{ fontSize: 11, background: '#e3f2fd', color: '#1565c0', borderRadius: 4, padding: '2px 6px' }}>
                  {ins.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs — reusing filter-buttons class from PharmacyList.css */}
      <div className="filter-buttons" style={{ marginBottom: 20 }}>
        <button className={activeTab === 'medicines'  ? 'active' : ''} onClick={() => setActiveTab('medicines')}>
          💊 Medicines ({medicines.length})
        </button>
        <button className={activeTab === 'staff'      ? 'active' : ''} onClick={() => setActiveTab('staff')}>
          👨‍⚕️ Pharmacists ({staff.length})
        </button>
        <button className={activeTab === 'insurances' ? 'active' : ''} onClick={() => setActiveTab('insurances')}>
          🛡️ Insurances ({insurances.length})
        </button>
      </div>

      {/* Medicines tab */}
      {activeTab === 'medicines' && (
        <>
          <input
            type="text"
            placeholder="🔍 Search medicines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', maxWidth: 360, padding: '10px 14px',
              border: '1px solid #ddd', borderRadius: 10,
              fontSize: 14, marginBottom: 16, fontFamily: 'inherit', outline: 'none',
            }}
          />
          {filteredMeds.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>
              {search ? 'No medicines match your search.' : 'No medicines listed yet.'}
            </p>
          ) : (
            <div className="pharmacy-grid">
              {filteredMeds.map(med => (
                <div key={med.id} className="pharmacy-card" style={{ cursor: 'default' }}>
                  <div className="pharmacy-info" style={{ padding: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 16 }}>{med.name}</h3>
                        {med.generic_name && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#999' }}>{med.generic_name}</p>}
                      </div>
                      <span style={{ fontWeight: 700, color: '#1565c0', fontSize: 15, whiteSpace: 'nowrap' }}>
                        {med.price ? `RWF ${Number(med.price).toLocaleString()}` : '—'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
                      {med.category && <span style={{ fontSize: 11, background: '#f0f4ff', color: '#3a5bcd', borderRadius: 4, padding: '2px 7px' }}>{med.category}</span>}
                      {med.unit     && <span style={{ fontSize: 11, background: '#f0faf4', color: '#2d7a4f', borderRadius: 4, padding: '2px 7px' }}>{med.unit}</span>}
                      {med.requires_prescription && <span style={{ fontSize: 11, background: '#fff4e5', color: '#c17100', borderRadius: 4, padding: '2px 7px' }}>Rx Required</span>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p className="distance" style={{ margin: 0 }}>Stock: <strong>{med.stock ?? '—'}</strong></p>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999,
                        background: med.is_available ? '#e8faf0' : '#fef0f0',
                        color:      med.is_available ? '#2d7a4f' : '#c0392b',
                      }}>
                        {med.is_available ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Staff tab */}
      {activeTab === 'staff' && (
        <>
          {staff.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>No pharmacists listed yet.</p>
          ) : (
            <div className="pharmacy-grid">
              {staff.map(person => (
                <div key={person.id} className="pharmacy-card" style={{ cursor: 'default', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1565c0, #42a5f5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, color: '#fff', margin: '0 auto 12px',
                  }}>
                    {person.name ? person.name.charAt(0).toUpperCase() : '👤'}
                  </div>
                  <div className="pharmacy-info" style={{ padding: 0 }}>
                    <h3 style={{ margin: '0 0 4px' }}>{person.name || 'Unknown'}</h3>
                    <p style={{ margin: '0 0 4px', color: '#888', fontSize: 13 }}>{person.role || 'Pharmacist'}</p>
                    {person.phone && <p className="phone">📞 {person.phone}</p>}
                    {person.email && <p className="phone">✉️ {person.email}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Insurances tab */}
      {activeTab === 'insurances' && (
        <>
          {insurances.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>No insurances accepted yet.</p>
          ) : (
            <div className="pharmacy-grid">
              {insurances.map(ins => (
                <div key={ins.id} className="pharmacy-card" style={{ cursor: 'default', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0, background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    🛡️
                  </div>
                  <div className="pharmacy-info" style={{ padding: 0 }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: 15 }}>{ins.name}</h3>
                    {ins.coverage_type && <p style={{ margin: '0 0 4px', fontSize: 13, color: '#666' }}>{ins.coverage_type}</p>}
                    {ins.phone && <p className="phone">📞 {ins.phone}</p>}
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: '#e8faf0', color: '#2d7a4f', display: 'inline-block', marginTop: 4 }}>
                      ✓ Accepted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default PharmacyDetail;