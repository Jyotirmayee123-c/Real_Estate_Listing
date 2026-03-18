const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // ← REMOVED unique:true — a person should be able to submit multiple enquiries
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
    },
    lookingTo: {
      type: String,
      required: true,
      enum: ["buy", "rent", "sell", "other"],
      default: "other",
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["apartment", "house", "commercial", "land", "other"],
      default: "other",
    },
    bestTimeToContact: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
    },
    preferredContactMethod: {
      type: String,
      enum: ["call", "email", "whatsApp"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;