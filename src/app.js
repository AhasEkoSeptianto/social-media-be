const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { env } = require("./config/env");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const routes = require("./routes");
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error.middleware");

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

if (env !== "test") {
  app.use(morgan(env === "production" ? "combined" : "dev"));
}

// Pastikan DB konek di SETIAP request (bukan cuma sekali saat cold start).
// connectDB() sudah di-cache (isConnected flag), jadi ini murah untuk warm instance.
// Kalau upaya pertama gagal (mis. saat cold start), request berikutnya otomatis
// coba lagi -- tidak macet permanen seperti kalau cuma dipanggil sekali di server.js.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tidak bisa terhubung ke database",
    });
  }
});

// Health check
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// API routes
app.use("/api", routes);

// 404 & error handler (harus di paling bawah)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
