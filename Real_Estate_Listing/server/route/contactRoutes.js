const express = require("express");
const { createContact, getContact, deleteContact } = require("../controller/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const contactRoutes = express.Router();

contactRoutes.post("/", createContact);
contactRoutes.get("/", protect, adminOnly, getContact);
contactRoutes.delete("/:id", protect, adminOnly, deleteContact);

module.exports = contactRoutes;