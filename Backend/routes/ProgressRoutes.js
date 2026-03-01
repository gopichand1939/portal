const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const progressController = require('../controller/progress.controller');

// GET /api/progress – chapter-wise percentages { aptitude, verbal, reasoning, python }
router.get('/', authMiddleware, progressController.getDashboardOverall);
// GET /api/progress/overall – alias for dashboard combined
router.get('/overall', authMiddleware, progressController.getDashboardOverall);

// GET /api/progress/modules – all subject module rows for sidebar ticks (must be before /:subject)
router.get('/modules', authMiddleware, progressController.getModulesProgress);

// GET /api/progress/:subject/overall – subject overall progress
router.get('/:subject/overall', authMiddleware, progressController.getSubjectOverall);

// POST /api/progress/:subject/complete – mark content completed
router.post('/:subject/complete', authMiddleware, progressController.completeContent);

module.exports = router;
