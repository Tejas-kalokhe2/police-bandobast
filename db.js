const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'police_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  // comment out the next line unless your cloud DB requires SSL
  // ssl: { rejectUnauthorized: true }
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

module.exports = connection;
