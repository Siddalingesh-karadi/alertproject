import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertForm from './AlertForm';
import AlertCard from './AlertCard';

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleAlertSubmit = () => {
    fetchAlerts(); // Refresh alerts after submission
  };

  // Calculate statistics
  const totalIssues = alerts.length;
  const resolvedIssues = alerts.filter(a => a.status === 'resolved').length;
  const pendingIssues = alerts.filter(a => a.status === 'pending').length;
  const investigatingIssues = alerts.filter(a => a.status === 'investigating').length;
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            margin: '0 0 0.5rem 0'
          }}>
            📊 Dashboard
          </h1>
          <p style={{ color: '#64748b', margin: 0 }}>
            Track and manage your issues efficiently
          </p>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Issues</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {totalIssues}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              📈 All reported issues
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(245, 87, 108, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Pending</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {pendingIssues}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              ⏳ Waiting to start
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(79, 172, 254, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>In Progress</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {investigatingIssues}
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
            boxShadow: '0 10px 30px rgba(67, 233, 123, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Resolved</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {resolvedIssues}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              ✅ Issues closed
            </div>
          </div>
        </div>

        {/* Resolution Rate */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Resolution Rate</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                Percentage of issues resolved
              </p>
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#43e97b'
            }}>
              {resolutionRate}%
            </div>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            marginTop: '1rem',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${resolutionRate}%`,
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Report Form */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1.5rem'
            }}>
              📝 Report New Issue
            </h2>
            <AlertForm onSubmit={handleAlertSubmit} />
          </div>

          {/* Reports List */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1.5rem'
            }}>
              📋 Your Issues
            </h2>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Loading your issues...
                </div>
                <div style={{
                  marginTop: '1rem',
                  animation: 'spin 1s linear infinite'
                }}>
                  ⏳
                </div>
              </div>
            ) : error ? (
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #fecaca',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            ) : alerts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                <p>No issues reported yet. Start by reporting your first issue!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {alerts.map(alert => (
                  <AlertCard key={alert._id} alert={alert} isAdmin={false} />
                ))}
              </div>
            )}
          </div>
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