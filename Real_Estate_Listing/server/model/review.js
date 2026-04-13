const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
  deleteReview,
} = require("../controller/reviewController");

// GET    /review        → fetch all reviews
// POST   /review        → create a new review
// DELETE /review/:id    → delete a review by ID

router.get("/", getAllReviews);
router.post("/", createReview);
router.delete("/:id", deleteReview);

module.exports = router;