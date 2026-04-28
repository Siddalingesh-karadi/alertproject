const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { auth, adminAuth } = require('./middleware/auth');
const User = require('./models/User');
const Alert = require('./models/Alert');

const app = express();

// 1. OPEN CORS (Fixes the "Offline" status in the browser)
app.use(cors());
app.use(express.json());

// 2. DATABASE CONNECTION
const MONGO_URI = 'mongodb+srv://krupank911_db_user:pesitm@cluster0.mcuctpw.mongodb.net/SafetyNet?retryWrites=true&w=majority';
const PORT = 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ SUCCESS: Connected to MongoDB Atlas"))
  .catch(err => console.log("❌ ERROR: Auth or Network issue:", err.message));

// 3. AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const user = new User({ username, password, email, role: role || 'user' });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    let message = error.message;
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyValue)[0];
      message = `${dupField} already exists`;
    }
    res.status(400).json({ error: message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ALERT ROUTES
app.get('/api/status', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  console.log(`📡 Heartbeat check: ${isConnected ? 'Online' : 'Offline'}`);
  res.json({ connected: isConnected });
});

app.post('/api/alerts', auth, async (req, res) => {
  try {
    const { title, location } = req.body;
    const newAlert = new Alert({
      title,
      location,
      userEmail: req.user.email,
      userId: req.user._id
    });
    await newAlert.save();
    console.log("📝 New Alert Saved!");
    res.status(201).json({ message: "Success", alert: newAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/alerts', auth, async (req, res) => {
  try {
    let alerts;
    if (req.user.role === 'admin') {
      alerts = await Alert.find().populate('userId', 'username email').sort({ createdAt: -1 });
    } else {
      alerts = await Alert.find({ userId: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/alerts/:id', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const alert = await Alert.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/alerts/:id', auth, adminAuth, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json({ message: 'Alert deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SafetyNet Backend: http://localhost:${PORT}`);
});