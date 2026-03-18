const enquiryModel = require("../model/enquiryModel");

// @desc    Create a new enquiry
// @route   POST /api/enquiry
// @access  Public
exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, property } = req.body;

    if (!name || !email || !phone || !message || !property) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields",
      });
    }

    const enquiry = await enquiryModel.create(req.body);
    res.status(201).json({ success: true, enquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiry
// @access  Private/Admin
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryModel
      .find()
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries, // ← AdminEnquiry.jsx reads: res.data.enquiries || res.data.data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiry/:id
// @access  Private/Admin
exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await enquiryModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, msg: "Enquiry not found" });
    }

    res.status(200).json({ success: true, msg: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};