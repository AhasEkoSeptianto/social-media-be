const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { port } = require("./config/env");
const logger = require("./utils/logger");
const corsOptions = require("./config/cors");

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

// register socket
require("./socket")(io);

server.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
