// ======================================================
// 🚓 POLICE DEPLOYMENT APP SERVER (FINAL VERSION)
// ======================================================

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Import MySQL connection from db.js

// Initialize the app
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static HTML files

// ======================================================
// 1️⃣ LOGIN SYSTEM (Admin / Control Room)
// ======================================================

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).send('Internal server error');
      }

      if (results.length > 0) {
        console.log(`✅ Login successful for user: ${username}`);
        res.redirect('/home.html'); // Redirect to dashboard/home page
      } else {
        console.warn(`⚠️ Invalid login for: ${username}`);
        res.status(401).send('Invalid username or password');
      }
    }
  );
});

// ======================================================
// 2️⃣ OFFICER / REPORT SUBMISSION (QR Form Submission)
// ======================================================

app.post('/add-officer', (req, res) => {
  const { name, rank, city, mobile, assigned_location } = req.body;

  const sql =
    'INSERT INTO officers (name, `rank`, city, mobile, assigned_location) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, rank, city, mobile, assigned_location], (err, result) => {
    if (err) {
      console.error('❌ Error adding officer:', err);
      res.status(500).send('Database error');
    } else {
      console.log('✅ Officer added:', name);
      res.redirect('/dashboard.html');
    }
  });
});

// ======================================================
// 3️⃣ FETCH ALL OFFICERS (Dashboard Display)
// ======================================================

app.get('/officers', (req, res) => {
  const sql = 'SELECT * FROM officers ORDER BY timestamp DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching officers:', err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// ======================================================
// 4️⃣ START SERVER
// ======================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚓 Police App server running on http://localhost:${PORT}`);
});
