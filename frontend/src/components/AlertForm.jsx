import React, { useState } from 'react';

const AlertForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleReport = (e) => {
    e.preventDefault();
    alert(`Success! You reported: ${title} at ${location}. \nAn admin will verify this soon.`);
    // Clears the form after clicking
    setTitle('');
    setLocation('');
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <form onSubmit={handleReport}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Issue Title:</label>
          <input 
            type="text" 
            placeholder="e.g., Streetlight Out" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Location:</label>
          <input 
            type="text" 
            placeholder="e.g., Main Street, Block 4" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', background: '#d9534f', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          Submit Safety Report
        </button>
      </form>
    </div>
  );
};

export default AlertForm;