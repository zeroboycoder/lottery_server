const mongoose = require("mongoose");

const betSettingSchema = new mongoose.Schema(
  {
    banNumbers: [
      {
        type: String,
        unique: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("betSetting", betSettingSchema);
