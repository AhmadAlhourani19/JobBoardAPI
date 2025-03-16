require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./src/config/db'); // Import database

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// ✅ REMOVE `db.connect()`, it's not needed for a connection pool

// Default Route (API Health Check)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Job Board API!' });
});

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
