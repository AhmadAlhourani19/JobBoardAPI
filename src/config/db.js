const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
        connection.release();
    }
});

module.exports = db;
