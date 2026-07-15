const express = require("express");

const requireAuth = require("../middleware/auth.middleware");
const { createPost, getPost } = require("../controllers/post.controller");

const router = express.Router();

router.post("/create", requireAuth, createPost);

router.get("/", requireAuth, getPost);

module.exports = router;
