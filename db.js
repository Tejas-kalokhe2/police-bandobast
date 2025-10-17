// db.js
const mysql = require('mysql2');

// ✅ Railway MySQL connection
const connection = mysql.createConnection({
  host: 'interchange.proxy.rlwy.net',   // from Railway Connect tab
  user: 'root',                         // username from Railway
  password: 'yCSivZMHrUTYBMCSSFKOarkhHsHGUYBj', // your Railway password
  database: 'police_db',                // the database you created
  port: 54828                           // Railway port
});

// ✅ Connect and verify
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to Railway MySQL Database');
  }
});

module.exports = connection;
