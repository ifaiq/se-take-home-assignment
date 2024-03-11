const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
      default: 1
    },
    type: {
      type: String,
      enum: ["normal", "VIP"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
