const express = require("express");
const router  = express.Router();
const {
  getAllReviews,
  createReview,
  toggleApproveReview,
  deleteReview,
  getApprovedReviews,
} = require("../controller/reviewController");

// NOTE: /approved must be defined BEFORE /:id to avoid route conflict
router.get("/approved",      getApprovedReviews);
router.get("/",              getAllReviews);
router.post("/",             createReview);
router.patch("/:id/approve", toggleApproveReview);
router.delete("/:id",        deleteReview);

module.exports = router;