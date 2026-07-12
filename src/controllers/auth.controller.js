const { verifyGoogleToken } = require('../services/google.service');
const {
  findOrCreateUser,
  generateSessionToken,
} = require('../services/auth.service');
const { cookieName, env } = require('../config/env');

const cookieOptions = {
  httpOnly: true,
  secure: env === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
};

/**
 * POST /api/auth/google
 * Body: { token: string }  <- ID token dari Google Identity Services (frontend)
 */
async function loginWithGoogle(req, res, next) {
  try {
    const { token } = req.body;

    const googlePayload = await verifyGoogleToken(token);
    const user = await findOrCreateUser(googlePayload);
    const sessionToken = generateSessionToken(user);

    res.cookie(cookieName, sessionToken, cookieOptions);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me
 * Mengembalikan data user yang sedang login (butuh middleware auth).
 */
async function getCurrentUser(req, res) {
  res.status(200).json({ success: true, user: req.user });
}

/**
 * POST /api/auth/logout
 */
async function logout(req, res) {
  res.clearCookie(cookieName);
  res.status(200).json({ success: true, message: 'Logged out' });
}

module.exports = { loginWithGoogle, getCurrentUser, logout };
