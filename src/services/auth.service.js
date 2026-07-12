const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { jwt: jwtConfig } = require('../config/env');

/**
 * Cari user berdasarkan googleId. Kalau belum ada, buat baru.
 */
async function findOrCreateUser({ googleId, email, name, avatarUrl }) {
  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({ googleId, email, name, avatarUrl });
  }

  return user;
}

function generateSessionToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
}

function verifySessionToken(token) {
  return jwt.verify(token, jwtConfig.secret);
}

module.exports = {
  findOrCreateUser,
  generateSessionToken,
  verifySessionToken,
};
