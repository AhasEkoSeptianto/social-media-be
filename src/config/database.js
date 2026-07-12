const mongoose = require('mongoose');
const { mongodbUri, env } = require('./env');
const logger = require('../utils/logger');

async function connectDB() {
  if (env === 'test') return; // skip koneksi saat testing

  try {
    await mongoose.connect(mongodbUri);
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection failed', err);
    process.exit(1);
  }
}

module.exports = connectDB;
