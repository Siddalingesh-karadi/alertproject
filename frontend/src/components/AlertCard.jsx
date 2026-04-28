import React from 'react';

export default function AlertCard({ alert, isAdmin, onStatusUpdate, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'investigating': return '#3b82f6';
      case 'resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'pending': return '#fef3c7';
      case 'investigating': return '#dbeafe';
      case 'resolved': return '#d1fae5';
      default: return '#f3f4f6';
    }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
      cursor: isAdmin ? 'default' : 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 0.5rem 0',
            color: '#1e293b',
            fontSize: '1.25rem',
            fontWeight: '600',
            lineHeight: '1.4'
          }}>
            {alert.title}
          </h3>
          <div style={{
            display: 'inline-block',
            backgroundColor: getStatusBg(alert.status),
            color: getStatusColor(alert.status),
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {alert.status}
          </div>
        </div>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <select
              value={alert.status}
              onChange={(e) => onStatusUpdate(alert._id, e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                minWidth: '120px'
              }}
            >
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
            <button
              onClick={() => onDelete(alert._id)}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>
            Location
          </div>
          <div style={{ color: '#1e293b', fontWeight: '500' }}>
            📍 {alert.location}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>
            Reported By
          </div>
          <div style={{ color: '#1e293b', fontWeight: '500' }}>
            👤 {alert.userId?.username || alert.userEmail}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.25rem' }}>
          Reported At
        </div>
        <div style={{ color: '#1e293b', fontWeight: '500' }}>
          🕒 {formatDate(alert.createdAt)}
        </div>
      </div>
    </div>
  );
}