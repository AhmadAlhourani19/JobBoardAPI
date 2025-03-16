const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
    [name, email, hashedPassword, role], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { registerUser, loginUser };
