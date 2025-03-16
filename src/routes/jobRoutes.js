const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles('recruiter'), createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', authenticateToken, authorizeRoles('recruiter'), updateJob);
router.delete('/:id', authenticateToken, authorizeRoles('recruiter'), deleteJob);

module.exports = router;
