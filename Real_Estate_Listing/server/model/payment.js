const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userName:      { type: String, required: true },
    userEmail:     { type: String, required: true },
    userPhone:     { type: String },
    propertyName:  { type: String, required: true },
    propertyType:  { type: String },
    amount:        { type: Number, required: true },
    amountPaid:    { type: Number, required: true },
    paymentMethod: { type: String, enum: ["upi", "card", "netbanking", "cash", "wallet", "emi"], default: "upi" },
    paymentStatus: { type: String, enum: ["success", "pending", "failed"], default: "pending" },
    transactionId: { type: String },
    notes:         { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);