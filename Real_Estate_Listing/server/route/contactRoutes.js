const express = require("express");
const { createContact, getContact, deleteContact } = require("../controller/contactController");
const contactRoutes = express.Router();

contactRoutes.post("/", createContact)
contactRoutes.get("/", getContact);
contactRoutes.delete("/:id", deleteContact);

module.exports = contactRoutes;