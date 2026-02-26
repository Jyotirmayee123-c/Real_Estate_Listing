const express = require("express");
const { createEnquiry, getAllEnquiries, deleteEnquiry } = require("../controller/enquiryController");
const router = express.Router();

router.post("/",createEnquiry);
router.get("/",getAllEnquiries);
router.delete("/:id",deleteEnquiry);

module.exports = router;
