const express = require('express');
const { register, login, me, profile, resetPassword } = require('../controller/controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const progressRoutes = require('./ProgressRoutes');

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authMiddleware, me);
router.get('/auth/profile', authMiddleware, profile);
router.post('/auth/reset-password', resetPassword);
router.use('/progress', progressRoutes);

module.exports = router;
