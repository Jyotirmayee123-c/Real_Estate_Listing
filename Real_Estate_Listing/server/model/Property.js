const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    listingType: {
      type: String,
      enum: ["buy", "rent", "sell", "other"],
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["apartment", "house", "commercial", "land", "other"],
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number, // sqft
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Property", PropertySchema);