const { default: slugify } = require("slugify");
const Property = require("../model/Property");

exports.createProperty = async (req, res) => {
  try {
    const { title } = req.body;

    const slug = slugify(title, { lower: true });

    // const thumbnail = req.files.thumbnail[0].path;
    // const images = req.files.images.map((file) => file.path);

    const property = await Property.create({
      ...req.body,
      slug,
      // thumbnail,
      // images,
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
      req.body.slug = slugify(req.body.title, { lower: true });
    }

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

// ✅ GET ALL PROPERTIES (Admin)
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


// ✅ GET SINGLE PROPERTY
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
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching property",
      error: error.message,
    });
  }
};

// ✅ DELETE PROPERTY (Admin)
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