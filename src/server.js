const app = require('./app');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const logger = require('./utils/logger');

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
  });
}

startServer();
