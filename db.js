const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'interchange.proxy.rlwy.net',
  user: 'root',
  password: 'yCSivZMHrUTYBMCSSFKOarkhHsHGUYBj',
  database: 'railway',
  port: 54828
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to Railway MySQL Database');
  }
});

module.exports = connection;
