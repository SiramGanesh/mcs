// ============================================
// Authentication Routes
// ============================================
// Defines the API endpoints for authentication.
// Each route maps a URL + HTTP method to a
// controller function.
// ============================================

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// POST /api/auth/register - Create new account
router.post('/register', register);

// POST /api/auth/login - Login and get token
router.post('/login', login);

// GET /api/auth/me - Get current user (requires login)
router.get('/me', protect, getMe);

module.exports = router;
