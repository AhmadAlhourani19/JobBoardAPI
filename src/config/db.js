const mysql = require('mysql');
require('dotenv').config();

// ✅ Use a connection pool instead of a direct connection
const db = mysql.createPool({
    connectionLimit: 10, // Limits the number of connections
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test Database Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
        connection.release(); // Release the connection
    }
});

module.exports = db;
