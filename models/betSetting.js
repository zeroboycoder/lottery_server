const mongoose = require("mongoose");

const betSettingSchema = new mongoose.Schema(
  {
    banNumbers: [
      {
        type: String,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("betSetting", betSettingSchema);
