const express = require('express');
const { register, login, me, resetPassword } = require('../controller/controller');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authMiddleware, me);
router.post('/auth/reset-password', resetPassword);

module.exports = router;
