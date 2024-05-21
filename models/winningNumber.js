const mongoose = require("mongoose");

const winningNumberSchema = new mongoose.Schema(
  {
    winningNumber: {
      type: String,
      required: true,
    },
    tootNumbers: [
      {
        type: String,
        required: true,
      },
    ],
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("winningNumber", winningNumberSchema);
