const express = require("express");
const {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} = require("../controller/enquiryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createEnquiry);                            
router.get("/", protect, adminOnly, getAllEnquiries);        
router.delete("/:id", protect, adminOnly, deleteEnquiry);   
module.exports = router;