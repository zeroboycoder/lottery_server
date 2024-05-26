const mongoose = require("mongoose");

const betSettingSchema = new mongoose.Schema(
  {
    banNumbers: [
      {
        type: String,
      },
    ],
    limitAmount: [
      {
        number: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    odds: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("betSetting", betSettingSchema);
