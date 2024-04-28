const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    playerPhone: {
      type: String,
    },
    bettingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "betting",
      required: true,
    },
    winningNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("winner", winnerSchema);
