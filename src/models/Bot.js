const mongoose = require("mongoose");

const botSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["idle", "processing"],
      default: "idle",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

const Bot = mongoose.model("Bot", botSchema);

module.exports = Bot;
