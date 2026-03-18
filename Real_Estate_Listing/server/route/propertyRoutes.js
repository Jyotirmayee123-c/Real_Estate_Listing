const express = require("express");
const {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
} = require("../controller/propertyController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC — anyone can view
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);

// PROTECTED — admin only
router.post("/", protect, adminOnly, createProperty);
router.put("/:id", protect, adminOnly, updateProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);

module.exports = router;