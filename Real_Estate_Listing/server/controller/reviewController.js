const Review = require('../models/Review');  // capital R

// GET /api/review — all reviews (admin)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error("getAllReviews error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

// GET /api/review/approved — only approved reviews (public)
const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error("getApprovedReviews error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch approved reviews" });
  }
};

// POST /api/review — submit a new review
const createReview = async (req, res) => {
  try {
    const { userName, userEmail, propertyName, propertyId, rating, comment } = req.body;

    if (!userName || !userEmail || !rating) {
      return res.status(400).json({ success: false, message: "userName, userEmail, and rating are required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const review = await Review.create({
      userName:     userName.trim(),
      userEmail:    userEmail.trim().toLowerCase(),
      propertyName: propertyName?.trim() || "",
      propertyId:   propertyId || null,
      rating:       Number(rating),
      comment:      comment?.trim() || "",
      isApproved:   false,
    });

    return res.status(201).json({ success: true, message: "Review submitted successfully", data: review });
  } catch (error) {
    console.error("createReview error:", error);
    return res.status(500).json({ success: false, message: "Failed to create review" });
  }
};

// PATCH /api/review/:id/approve — toggle approve/unapprove (admin)
const toggleApproveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    review.isApproved = !review.isApproved;
    await review.save();

    return res.status(200).json({
      success: true,
      message: `Review ${review.isApproved ? "approved" : "unapproved"}`,
      data: review,
    });
  } catch (error) {
    console.error("toggleApproveReview error:", error);
    return res.status(500).json({ success: false, message: "Failed to update review" });
  }
};

// DELETE /api/review/:id — delete a review (admin)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    return res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("deleteReview error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete review" });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  toggleApproveReview,
  deleteReview,
  getApprovedReviews,
};