const express = require("express");

const requireAuth = require("../middleware/auth.middleware");
const {
  createPost,
  getPost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.delete("/delete/:id", requireAuth, deletePost);
router.post("/create", requireAuth, createPost);
router.get("/", requireAuth, getPost);

module.exports = router;
