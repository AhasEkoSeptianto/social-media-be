const express = require("express");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.route");
const profileRoutes = require("./profile.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
