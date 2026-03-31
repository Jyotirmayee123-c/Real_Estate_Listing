const slugify = require("slugify");
const Property = require("../model/Property");

// @desc    Create a property
// @route   POST /api/property
// @access  Private/Admin
exports.createProperty = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    // Generate a unique slug
    const baseSlug = slugify(title, { lower: true, strict: true });
    const slug = `${baseSlug}-${Date.now()}`;

    // ✅ FIX: Handle image uploads from req.files (Cloudinary/Multer)
    if (req.files?.thumbnail) {
      req.body.thumbnail = req.files.thumbnail[0].path;
    }
    if (req.files?.images) {
      req.body.images = req.files.images.map((file) => file.path);
    }

    const property = await Property.create({
      ...req.body,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating property",
      error: error.message,
    });
  }
};

// @desc    Update a property
// @route   PUT /api/property/:id
// @access  Private/Admin
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (req.body.title) {
      const baseSlug = slugify(req.body.title, { lower: true, strict: true });
      req.body.slug = `${baseSlug}-${Date.now()}`;
    }

    // ✅ Handle file uploads if present (Cloudinary flow)
    if (req.files?.thumbnail) {
      req.body.thumbnail = req.files.thumbnail[0].path;
    }
    if (req.files?.images) {
      req.body.images = req.files.images.map((file) => file.path);
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating property",
      error: error.message,
    });
  }
};

// @desc    Get all properties
// @route   GET /api/property
// @access  Public
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: error.message,
    });
  }
};

// @desc    Get a single property
// @route   GET /api/property/:id
// @access  Public
exports.getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching property",
      error: error.message,
    });
  }
};

// @desc    Delete a property
// @route   DELETE /api/property/:id
// @access  Private/Admin
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting property",
      error: error.message,
    });
  }
};