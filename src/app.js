const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { clientUrl, env } = require('./config/env');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(
  cors({
    origin: clientUrl,
    credentials: true, // penting supaya cookie session ikut terkirim
  })
);
app.use(express.json());
app.use(cookieParser());

if (env !== 'test') {
  app.use(morgan(env === 'production' ? 'combined' : 'dev'));
}

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// API routes
app.use('/api', routes);

// 404 & error handler (harus di paling bawah)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
