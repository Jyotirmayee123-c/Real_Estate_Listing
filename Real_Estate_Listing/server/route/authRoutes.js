const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getAllUsers,
  deleteUser,
} = require("../controller/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

// Admin only - protected routes
router.get("/users", protect, adminOnly, getAllUsers);

module.exports = router;