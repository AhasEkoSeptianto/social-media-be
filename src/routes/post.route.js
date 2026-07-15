const express = require("express");

const requireAuth = require("../middleware/auth.middleware");
const { createPost, getPost } = require("../controllers/post.controller");

const router = express.Router();

router.post("/create", createPost);

router.get("/", getPost);

module.exports = router;
