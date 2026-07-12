const express = require('express');
const {
  loginWithGoogle,
  getCurrentUser,
  logout,
} = require('../controllers/auth.controller');
const requireAuth = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/google', loginWithGoogle);
router.get('/me', requireAuth, getCurrentUser);
router.post('/logout', logout);

module.exports = router;
