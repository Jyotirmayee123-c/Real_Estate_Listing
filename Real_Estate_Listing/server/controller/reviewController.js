const Review = require("../models/Review"); // adjust path if needed

// ── GET /review ───────────────────────────────────────────────────────────────
// Returns all reviews sorted by newest first
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("getAllReviews error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// ── POST /review ──────────────────────────────────────────────────────────────
// Creates a new review
// Expected body: { userName, userEmail, propertyName, rating, comment }
const createReview = async (req, res) => {
  try {
    const { userName, userEmail, propertyName, rating, comment } = req.body;

    if (!userName || !userEmail || !rating) {
      return res.status(400).json({
        success: false,
        message: "userName, userEmail, and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const review = await Review.create({
      userName,
      userEmail,
      propertyName: propertyName || null,
      rating: Number(rating),
      comment: comment || "",
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error("createReview error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

// ── DELETE /review/:id ────────────────────────────────────────────────────────
// Deletes a review by its MongoDB _id
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: { _id: id },
    });
  } catch (error) {
    console.error("deleteReview error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
};