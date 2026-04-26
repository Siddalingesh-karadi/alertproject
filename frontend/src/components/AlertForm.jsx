import React, { useState } from 'react';

const AlertForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alertData = { title, location };

    try {
      // This "fetch" command sends the data to your backend port 5000
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData),
      });

      if (response.ok) {
        alert("✅ Alert saved to MongoDB!");
        setTitle(''); // Clear the boxes
        setLocation('');
      }
    } catch (error) {
      alert("❌ Error: Is your backend terminal running?");
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Issue (e.g. Broken Light)" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Location (e.g. Block C)" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#5cb85c', color: 'white', border: 'none', borderRadius: '5px' }}>
          Submit Safety Report
        </button>
      </form>
    </div>
  );
};

export default AlertForm;