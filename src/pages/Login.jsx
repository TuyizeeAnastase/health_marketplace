import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    min-height: 100vh;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Ambient background blobs */
  .lp-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    pointer-events: none;
  }
  .lp-blob-1 {
    width: 420px; height: 420px;
    background: #0066cc;
    top: -100px; left: -100px;
    animation: blobFloat 8s ease-in-out infinite;
  }
  .lp-blob-2 {
    width: 320px; height: 320px;
    background: #003366;
    bottom: -80px; right: -80px;
    animation: blobFloat 10s ease-in-out infinite reverse;
  }
  .lp-blob-3 {
    width: 200px; height: 200px;
    background: #003366;
    top: 50%; right: 20%;
    animation: blobFloat 6s ease-in-out infinite 2s;
  }

  @keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.05); }
  }

  /* Card */
  .lp-card {
    position: relative;
    width: 100%;
    max-width: 420px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 24px;
    padding: 48px 40px 40px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.5);
    animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Top accent line */
  .lp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2dd4bf, #003366, transparent);
    border-radius: 999px;
  }

  /* Icon badge */
  .lp-icon-badge {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, rgba(45,212,191,0.2), rgba(129,140,248,0.2));
    border: 1px solid rgba(45,212,191,0.3);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    font-size: 16px;
  }

  /* Headings */
  .lp-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #0066cc;
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin-bottom: 6px;
  }

  .lp-subtitle {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .lp-subtitle span {
    color: #0066cc;
    font-weight: 500;
  }

  /* Step indicator */
  .lp-steps {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
  }

  .lp-step-dot {
    height: 4px;
    border-radius: 999px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    background: #0066cc;
  }

  .lp-step-dot.active {
    background: linear-gradient(90deg, #0066cc, #003366);
    width: 28px !important;
  }

  .lp-step-dot.done {
    background: #0066cc;
    opacity: 0.5;
  }

  /* Form fields */
  .lp-field {
    margin-bottom: 20px;
    animation: fieldIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes fieldIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .lp-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #0066cc;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .lp-input-wrap {
    position: relative;
  }

  .lp-input-icon {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    opacity: 0.5;
  }

  .lp-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 13px 14px 13px 42px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: black;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
  }

  .lp-input::placeholder { color: #475569; }

  .lp-input:focus {
    border-color: #0066cc;
    background: rgba(45,212,191,0.06);
    box-shadow: 0 0 0 3px rgba(45,212,191,0.12);
  }

  .lp-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* OTP boxes */
  .lp-otp-row {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  .lp-otp-box {
    width: 42px;
    flex-shrink: 0;
    height: 42px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-size: 16px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: #f1f5f9;
    text-align: center;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    caret-color: #0066cc;
  }

  .lp-otp-box:focus {
    border-color: #0066cc;
    background: rgba(45,212,191,0.06);
    box-shadow: 0 0 0 3px rgba(45,212,191,0.12);
  }

  .lp-otp-box.filled {
    border-color: rgba(45,212,191,0.4);
    color: #0066cc;
  }

  /* Timer */
  .lp-timer {
    font-size: 13px;
    color: #64748b;
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .lp-timer-count {
    color: #0066cc;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .lp-resend-btn {
    background: none;
    border: none;
    color: #0066cc;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    font-family: 'DM Sans', sans-serif;
  }

  .lp-resend-btn:disabled {
    color: #475569;
    text-decoration: none;
    cursor: not-allowed;
  }

  /* Error */
  .lp-error {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 13px;
    color: #fca5a5;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fieldIn 0.3s ease both;
  }

  /* Submit button */
  .lp-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #0066cc, #003366);
    color: white;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.02em;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 8px;
  }

  .lp-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
  .lp-btn:active:not(:disabled) { transform: translateY(0); }
  .lp-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Shimmer on button */
  .lp-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .lp-btn:hover:not(:disabled)::after { transform: translateX(100%); }

  /* Spinner */
  .lp-spinner {
    width: 18px; height: 18px;
    border: 2px solid #0066cc;
    border-top-color: #0066cc;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Back link */
  .lp-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #0066cc;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 24px;
    transition: color 0.2s;
  }
  .lp-back:hover { color: #94a3b8; }

  /* Footer */
  .lp-footer {
    margin-top: 28px;
    text-align: center;
    font-size: 13px;
    color: #475569;
  }

  .lp-footer a {
    color: #0066cc;
    font-weight: 600;
    text-decoration: none;
  }
  .lp-footer a:hover { text-decoration: underline; }

  /* Phone display in step 2 */
  .lp-phone-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(45,212,191,0.1);
    border: 1px solid rgba(45,212,191,0.2);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 13px;
    color: #2dd4bf;
    font-weight: 500;
    margin-bottom: 24px;
  }

  /* Success state */
  .lp-success {
    text-align: center;
    padding: 20px 0;
    animation: fieldIn 0.5s ease both;
  }

  .lp-success-icon {
    font-size: 48px;
    margin-bottom: 16px;
    display: block;
    animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both 0.1s;
  }

  @keyframes popIn {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 480px) {
    .lp-card { padding: 36px 24px 32px; margin: 16px; }
    .lp-title { font-size: 16px; }
  }
`;

const SEND_OTP_URL   = 'http://localhost:3500/api/v1/auth/send-otp';
const VERIFY_OTP_URL = 'http://localhost:3500/api/v1/auth/verify-otp';

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(1);
  const [phone, setPhone]     = useState('');
  const [otp, setOtp]         = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer]     = useState(0);
  const otpRefs               = useRef([]);
  const timerRef              = useRef(null);

  // ── Countdown timer ────────────────────────────────────────
  useEffect(() => {
    if (timer <= 0) return;
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timer]);

  // ── Auto-focus first OTP box when step 2 mounts ───────────
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // ── Send OTP ───────────────────────────────────────────────
  const handleSendOTP = async () => {
    setError('');
    if (!phone.trim()) {
      return setError('Please enter your phone number.');
    }
    setLoading(true);
    try {
      await axios.post(SEND_OTP_URL, { phone });
      setStep(2);
      setTimer(60); // 60s resend cooldown
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to send OTP. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP ─────────────────────────────────────────────
  const handleVerifyOTP = async () => {
  setError('');
  const otpCode = otp.join('');

  if (otpCode.length < 6) {
    return setError('Please enter the complete 6-digit OTP.');
  }

  setLoading(true);
  try {
    const response = await fetch(VERIFY_OTP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, otp: otpCode }),  // ← explicit JSON
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid OTP.');
    }

    if (data.token) localStorage.setItem('token', data.token);
    if (data.data?.token) localStorage.setItem('token', data.data.token);

    setSuccess(true);
    setTimeout(() => navigate('/dashboard'), 1800);

  } catch (err) {
    setError(err.message || 'Invalid OTP. Please try again.');
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  } finally {
    setLoading(false);
  }
};

  // ── Resend OTP ─────────────────────────────────────────────
  const handleResend = async () => {
    if (timer > 0) return;
    setError('');
    setOtp(['', '', '', '', '', '']);
    setLoading(true);
    try {
      await axios.post(SEND_OTP_URL, { phone });
      setTimer(60);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to resend OTP.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── OTP box key handling ───────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') handleVerifyOTP();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const updated = [...otp];
    pasted.split('').forEach((char, i) => { updated[i] = char; });
    setOtp(updated);
    const nextEmpty = updated.findIndex(v => !v);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    otpRefs.current[focusIndex]?.focus();
  };

  const formatTimer = (s) => `0:${String(s).padStart(2, '0')}`;

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />

        <div className="lp-card">

          {/* Step dots */}
          <div className="lp-steps">
            {[1, 2].map(s => (
              <div
                key={s}
                className={`lp-step-dot ${step === s ? 'active' : step > s ? 'done' : ''}`}
                style={{ width: step === s ? 28 : 12 }}
              />
            ))}
          </div>

          {/* ── Success screen ── */}
          {success ? (
            <div className="lp-success">
              <span className="lp-success-icon">✅</span>
              <div className="lp-title">Verified!</div>
              <p className="lp-subtitle" style={{ marginBottom: 0 }}>
                Redirecting you to your dashboard…
              </p>
            </div>

          /* ── Step 1: Phone ── */
          ) : step === 1 ? (
            <>
              <div className="lp-icon-badge">📱</div>
              <div className="lp-title">Welcome back</div>
              <p className="lp-subtitle">
                Enter your phone number and we'll send you a <span>one-time code</span>.
              </p>

              {error && <div className="lp-error">⚠️ {error}</div>}

              <div className="lp-field">
                <label className="lp-label">Phone Number</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">🇷🇼</span>
                  <input
                    className="lp-input"
                    type="tel"
                    placeholder="+250 7XX XXX XXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendOTP()}
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              <button className="lp-btn" onClick={handleSendOTP} disabled={loading}>
                {loading ? <><span className="lp-spinner" />Sending…</> : 'Send OTP →'}
              </button>
            </>

          /* ── Step 2: OTP ── */
          ) : (
            <>
              <button className="lp-back" onClick={() => { setStep(1); setError(''); setOtp(['','','','','','']); }}>
                ← Back
              </button>

              <div className="lp-icon-badge">🔐</div>
              <div className="lp-title">Enter your code</div>
              <p className="lp-subtitle">OTP sent to</p>

              <div className="lp-phone-pill">📱 {phone}</div>

              {error && <div className="lp-error">⚠️ {error}</div>}

              <div className="lp-field">
                <label className="lp-label">6-Digit OTP</label>
                <div className="lp-otp-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => otpRefs.current[i] = el}
                      className={`lp-otp-box ${digit ? 'filled' : ''}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      disabled={loading}
                    />
                  ))}
                </div>

                {/* Timer / Resend */}
                <div className="lp-timer">
                  {timer > 0 ? (
                    <>Resend in <span className="lp-timer-count">{formatTimer(timer)}</span></>
                  ) : (
                    <>Didn't get a code?&nbsp;
                      <button className="lp-resend-btn" onClick={handleResend} disabled={loading}>
                        Resend OTP
                      </button>
                    </>
                  )}
                </div>
              </div>

              <button
                className="lp-btn"
                onClick={handleVerifyOTP}
                disabled={loading || otp.join('').length < 6}
              >
                {loading ? <><span className="lp-spinner" />Verifying…</> : 'Verify & Login →'}
              </button>
            </>
          )}

          <p className="lp-footer">
            Don't have an account? <a href="/register">Become a partner</a>
          </p>
        </div>
      </div>
    </>
  );
}