const Contact = require("../model/Contact");

// @desc    Create a new contact enquiry
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      whatsApp,
      lookingTo,
      propertyType,
      bestTimeToContact,
      preferredContactMethod,
      description,
    } = req.body;

    if (!fullName || !email || !phone || !lookingTo || !propertyType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const contact = new Contact({
      fullName,
      email,
      phone,
      whatsApp,
      lookingTo,
      propertyType,
      bestTimeToContact,
      preferredContactMethod,
      description,
    });

    await contact.save();
    res.status(201).json({ success: true, message: "Contact request saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
exports.getContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts, // AdminContact.jsx uses res?.data?.data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};