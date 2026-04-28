import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AlertForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Connection Heartbeat
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/status');
        setIsOnline(res.data.connected);
      } catch (err) {
        setIsOnline(false);
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/alerts', {
        title,
        location,
      });

      if (response.status === 201) {
        setStatusMsg('✅ Report Logged Successfully');
        setTitle('');
        setLocation('');
        if (onSubmit) onSubmit();
      }
    } catch (err) {
      setStatusMsg('❌ Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div style={{
        color: isOnline ? '#16a34a' : '#dc2626',
        fontWeight: 'bold',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>●</span>
        System Status: {isOnline ? "SECURE" : "OFFLINE"}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Incident Description</label>
          <input
            type="text"
            placeholder="Describe the incident"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Where did it happen?"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={!isOnline || loading}
        >
          {loading ? 'Submitting...' : 'Send Report'}
        </button>
      </form>

      {statusMsg && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          borderRadius: '6px',
          textAlign: 'center',
          backgroundColor: statusMsg.includes('✅') ? '#d1fae5' : '#fef2f2',
          color: statusMsg.includes('✅') ? '#065f46' : '#ef4444'
        }}>
          {statusMsg}
        </div>
      )}
    </div>
  );
}