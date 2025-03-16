const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { applyForJob, getApplicationsForUser, getApplicationsForRecruiter, updateApplicationStatus } = require('../controllers/applicationController');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles('job_seeker'), applyForJob);
router.get('/user', authenticateToken, authorizeRoles('job_seeker'), getApplicationsForUser);
router.get('/recruiter', authenticateToken, authorizeRoles('recruiter'), getApplicationsForRecruiter);
router.put('/:id', authenticateToken, authorizeRoles('recruiter'), updateApplicationStatus);

module.exports = router;
