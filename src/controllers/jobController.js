const db = require('../config/db');

const createJob = (req, res) => {
    const { title, company, location, description, category, salary } = req.body;
    const recruiter_id = req.user.id;
    
    db.query('INSERT INTO jobs (title, company, location, description, category, salary, recruiter_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, company, location, description, category, salary, recruiter_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ message: 'Job created successfully' });
    });
};

const getJobs = (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
};

const getJobById = (req, res) => {
    db.query('SELECT * FROM jobs WHERE id = ?', [req.params.id], (err, result) => {
        if (err || result.length === 0) return res.status(404).json({ message: 'Job not found' });
        res.json(result[0]);
    });
};

const updateJob = (req, res) => {
    db.query('UPDATE jobs SET ? WHERE id = ? AND recruiter_id = ?', [req.body, req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Job updated successfully' });
    });
};

const deleteJob = (req, res) => {
    db.query('DELETE FROM jobs WHERE id = ? AND recruiter_id = ?', [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Job deleted successfully' });
    });
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
