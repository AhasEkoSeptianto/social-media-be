const express = require("express");

const requireAuth = require("../middleware/auth.middleware");
const { createPost } = require("../services/post.service");

const router = express.Router();

router.post("/post", createPost);

module.exports = router;
