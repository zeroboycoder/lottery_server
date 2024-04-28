const mongoose = require("mongoose");

const bettingSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    playerPhone: {
      type: String,
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
    betting: [
      {
        betNumber: {
          type: String,
          required: true,
        },
        betAmount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("betting", bettingSchema);
