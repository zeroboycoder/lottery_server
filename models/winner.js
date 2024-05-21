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
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    winningAmount: {
      type: Number,
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
