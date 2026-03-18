const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controller/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// AdminUsers.jsx calls: api.delete(`/users/${id}`)
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;