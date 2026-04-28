import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertCard from './AlertCard';

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/alerts');
      setAlerts(res.data);
    } catch (error) {
      setError('Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleStatusUpdate = async (alertId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/alerts/${alertId}`, { status: newStatus });
      fetchAlerts(); // Refresh alerts
    } catch (error) {
      setError('Failed to update alert status');
    }
  };

  const handleDelete = async (alertId) => {
    if (window.confirm('Are you sure you want to delete this alert? This action cannot be undone.')) {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/alerts/${alertId}`);
        fetchAlerts(); // Refresh alerts
      } catch (error) {
        setError('Failed to delete alert');
      }
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.status === filter;
    const matchesSearch = searchTerm === '' ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.userId?.username || alert.userEmail).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const stats = {
    total: alerts.length,
    pending: alerts.filter(a => a.status === 'pending').length,
    investigating: alerts.filter(a => a.status === 'investigating').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            margin: '0 0 0.5rem 0'
          }}>
            🔐 Admin Dashboard
          </h1>
          <p style={{ color: '#64748b', margin: 0 }}>
            Monitor and manage all issues across the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Issues</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {stats.total}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              📊 All reported issues
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(245, 87, 108, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Pending</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {stats.pending}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              ⏳ Awaiting action
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(79, 172, 254, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>In Progress</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {stats.investigating}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              🔄 Being investigated
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(67, 233, 123, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Resolved</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {stats.resolved}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              ✅ Issues closed
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            margin: '0 0 1.5rem 0',
            color: '#1e293b',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            🔍 Search & Filter
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: '#475569',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: '#475569',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Filter by Status
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                color: '#475569',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
                <option value="status">By Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #e5e7eb',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              📋 All Issues ({sortedAlerts.length})
            </h2>
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                ⏳ Loading issues...
              </div>
              <div style={{
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '3px solid #e5e7eb',
                borderTop: '3px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '1.5rem',
              borderRadius: '0 0 12px 12px',
              border: '1px solid #fecaca',
              margin: '0'
            }}>
              ❌ {error}
            </div>
          ) : sortedAlerts.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No issues found</div>
              <div>Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            <div style={{
              padding: '1.5rem 2rem',
              display: 'grid',
              gap: '1rem'
            }}>
              {sortedAlerts.map(alert => (
                <AlertCard
                  key={alert._id}
                  alert={alert}
                  isAdmin={true}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}