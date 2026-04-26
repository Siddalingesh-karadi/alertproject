const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); 

// --- 1. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to Campus Safety Database"))
  .catch(err => console.log("❌ Database connection error:", err));

// --- 2. DATA SCHEMA ---
const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' }, 
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', ReportSchema);

// --- 3. ROUTES (CRUD) ---

// CREATE: Add a new report
app.post('/api/reports', async (req, res) => {
  try {
    const newReport = new Report({
      title: req.body.title,
      location: req.body.location
    });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: "Error saving report" });
  }
});

// READ: Get all reports
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

// UPDATE: Change status to 'Resolved'
app.put('/api/reports/:id', async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id, 
      { status: 'Resolved' }, 
      { new: true } // Returns the updated document
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// DELETE: Remove from database
app.delete('/api/reports/:id', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

// --- 4. SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});