const express = require("express");

const requireAuth = require("../middleware/auth.middleware");
const { getUsers } = require("../controllers/search.controller");

const router = express.Router();

router.get("/", requireAuth, getUsers);

module.exports = router;
