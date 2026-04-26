import React, { useState, useEffect } from 'react';
import './App.css';
import AlertForm from './components/AlertForm'; 

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [reports, setReports] = useState([]);

  // 1. Function to get all reports from the database
  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // 2. Function to mark a report as 'Resolved'
  const resolveReport = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: 'PUT',
      });
      fetchReports(); // Refresh the list so the color changes
    } catch (error) {
      console.error("Error resolving report:", error);
    }
  };

  // 3. Function to delete a report forever
  const deleteReport = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await fetch(`http://localhost:5000/api/reports/${id}`, {
          method: 'DELETE',
        });
        fetchReports(); // Refresh the list so the card disappears
      } catch (error) {
        console.error("Error deleting report:", error);
      }
    }
  };

  // Load reports automatically when switching to Admin View
  useEffect(() => {
    if (isAdmin) {
      fetchReports();
    }
  }, [isAdmin]);

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
          /* --- ADMIN VIEW --- */
          <div>
            <h2 style={{ color: '#d9534f' }}>Admin Dashboard</h2>
            <button onClick={fetchReports} style={{ marginBottom: '15px' }}>🔄 Refresh List</button>
            <hr />
            {reports.length === 0 ? (
              <p>No reports to verify yet.</p>
            ) : (
              reports.map((report) => (
                <div key={report._id} style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', textAlign: 'left' }}>
                  <p><strong>Issue:</strong> {report.title}</p>
                  <p><strong>Location:</strong> {report.location}</p>
                  <p><strong>Status:</strong> 
                    <span style={{ color: report.status === 'Resolved' ? 'green' : 'red', fontWeight: 'bold', marginLeft: '5px' }}>
                      {report.status}
                    </span>
                  </p>
                  
                  <div style={{ marginTop: '10px' }}>
                    {report.status !== 'Resolved' && (
                      <button 
                        onClick={() => resolveReport(report._id)}
                        style={{ marginRight: '10px', padding: '5px 10px', background: '#5cb85c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Mark Resolved ✅
                      </button>
                    )}
                    <button 
                      onClick={() => deleteReport(report._id)}
                      style={{ padding: '5px 10px', background: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* --- USER VIEW --- */
          <div>
            <h2 style={{ color: '#5cb85c' }}>Community Safety Feed</h2>
            <p>Report issues like broken lights or safety concerns below.</p>
            <AlertForm />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;