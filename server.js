const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const DEFAULT_DATA = {
  title: "Gaming Tournament 2025",
  games: [
    "Beat Saber","Clash Royale","CODM Solo BR","FC 26",
    "FF Clash Squad","FF Solo BR","Forza","LOL 1v1",
    "MK 1","MLBB","PUBG Duo","PUBG TDM","Valorant 1v1"
  ].map(n => ({ id: n.replace(/\s/g,'-').toLowerCase(), name: n })),
  events: []
};

let scheduleData = DEFAULT_DATA;

try {
  if (fs.existsSync(DATA_FILE)) {
    scheduleData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    console.log('✅ Loaded saved schedule data');
  } else {
    console.log('📋 Starting with default schedule');
  }
} catch(e) {
  console.error('⚠️  Error loading data, using defaults:', e.message);
}

// GET current schedule
app.get('/api/data', (req, res) => {
  res.json(scheduleData);
});

// POST (save) schedule
app.post('/api/data', (req, res) => {
  try {
    scheduleData = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(scheduleData, null, 2));
    res.json({ ok: true, saved: new Date().toISOString() });
  } catch(e) {
    console.error('Save error:', e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Reset to defaults
app.post('/api/reset', (req, res) => {
  scheduleData = DEFAULT_DATA;
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(scheduleData, null, 2)); } catch(e) {}
  res.json({ ok: true });
});

// Health check (Railway uses this)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
});

// All other routes serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏆 Tournament Board running → http://localhost:${PORT}`);
});
