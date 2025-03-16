const db = require('../config/db');

const applyForJob = (req, res) => {
    const { job_id } = req.body;
    const user_id = req.user.id;
    
    db.query('INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, "pending")',
    [job_id, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ message: 'Application submitted successfully' });
    });
};

const getApplicationsForUser = (req, res) => {
    db.query('SELECT applications.id, jobs.title, applications.status FROM applications INNER JOIN jobs ON applications.job_id = jobs.id WHERE applications.user_id = ?',
    [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
};

const getApplicationsForRecruiter = (req, res) => {
    db.query(`SELECT applications.id, users.name AS applicant_name, jobs.title, applications.status 
              FROM applications 
              INNER JOIN jobs ON applications.job_id = jobs.id 
              INNER JOIN users ON applications.user_id = users.id
              WHERE jobs.recruiter_id = ?`, 
    [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
};

const updateApplicationStatus = (req, res) => {
    const { status } = req.body;
    
    db.query('UPDATE applications SET status = ? WHERE id = ?',
    [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Application status updated successfully' });
    });
};

module.exports = { applyForJob, getApplicationsForUser, getApplicationsForRecruiter, updateApplicationStatus };
