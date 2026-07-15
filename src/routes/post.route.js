const express = require("express");

const requireAuth = require("../middleware/auth.middleware");
const {
  createPost,
  getPost,
  deletePost,
  likePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.delete("/delete/:id", requireAuth, deletePost);
router.post("/create", requireAuth, createPost);

router.put("/like/:id", requireAuth, likePost);

router.get("/", requireAuth, getPost);

module.exports = router;
