import React, { useState } from 'react';
import './App.css';
// This line connects the form you're about to create below
import AlertForm from './components/AlertForm'; 

function App() {
  // This manages whether we see the User view or Admin view
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      <nav style={{ padding: '20px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>SafetyNet-Pro 🚨</h2>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: 'none', fontWeight: 'bold' }}
        >
          Switch to {isAdmin ? "User View" : "Admin View"}
        </button>
      </nav>

      <main style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', background: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        {isAdmin ? (
          /* ADMIN VIEW */
          <div>
            <h2 style={{ color: '#d9534f' }}>Admin Dashboard</h2>
            <hr />
            <p><strong>Status:</strong> Viewing all reported incidents.</p>
            <div style={{ padding: '20px', border: '2px dashed #ccc', marginTop: '20px' }}>
              No reports to verify yet.
            </div>
          </div>
        ) : (
          /* USER VIEW */
          <div>
            <h2 style={{ color: '#5cb85c' }}>Community Safety Feed</h2>
            <p>Report issues like broken lights, potholes, or safety concerns below.</p>
            
            {/* This tag inserts the code from the other file */}
            <AlertForm />
            
            <div style={{ marginTop: '30px', textAlign: 'left' }}>
              <h4>Recent Alerts:</h4>
              <p style={{ color: '#888' }}>No alerts reported in your area yet.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;