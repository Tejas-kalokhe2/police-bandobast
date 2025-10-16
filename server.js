// =============================================
// 🚓 POLICE DEPLOYMENT APP SERVER (FINAL VERSION)
// =============================================

// Import modules (only once!)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Import MySQL connection from db.js

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serves HTML pages from /public

// =============================================
// 1️⃣ LOGIN SYSTEM (Admin / Control Room)
// =============================================
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
        res.send('✅ Login successful');
      } else {
        console.warn(`⚠️ Invalid login for: ${username}`);
        res.status(401).send('❌ Invalid username or password');
      }
    }
  );
});

// =============================================
// 2️⃣ OFFICER QR REPORT SUBMISSION
// =============================================
app.post('/submit-report', (req, res) => {
  const { name, rank, city, mobile, assigned_location } = req.body;

  if (!name || !rank || !city || !mobile) {
    return res.status(400).send('❌ All required fields must be filled.');
  }

  const sql = `
    INSERT INTO field_reports (name, rank, city, mobile, assigned_location)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, rank, city, mobile, assigned_location], (err) => {
    if (err) {
      console.error('❌ Error saving report:', err);
      return res.status(500).send('Internal server error');
    }

    console.log(`✅ Report submitted for officer: ${name}`);
    res.send('✅ Report submitted successfully!');
  });
});

// =============================================
// 3️⃣ FETCH REPORTS FOR DASHBOARD
// =============================================
app.get('/field-reports', (req, res) => {
  db.query('SELECT * FROM field_reports ORDER BY timestamp DESC', (err, results) => {
    if (err) {
      console.error('❌ Error fetching reports:', err);
      return res.status(500).send('Internal server error');
    }

    res.json(results);
  });
});

// =============================================
// 4️⃣ START THE SERVER
// =============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚓 Police App server running at http://localhost:${PORT}`);
});
