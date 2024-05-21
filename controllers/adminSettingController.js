const { betSettingModel } = require("../models");
const response = require("../utils/response");

exports.createBanNumber = async (req, res) => {
  try {
    const { number } = req.body;
    // Find the ban numbers and push the new number
    const betSetting = await betSettingModel.findOne();

    if (betSetting) {
      const banNumbers = betSetting?.banNumbers;
      const isExist = banNumbers.some((num) => num === number);
      if (isExist) {
        return response.error(res, "This number is already banned.");
      }
      await betSettingModel.findByIdAndUpdate(
        {
          _id: betSetting._id,
        },
        {
          banNumbers: [...banNumbers, number],
        }
      );
    } else {
      const banNumbers = [number];
      await betSettingModel.create({
        banNumbers,
      });
    }

    return response.success(res, "Add ban number successfully", {});
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.deleteBanNumber = async (req, res) => {
  try {
    const { number } = req.body;
    const betSetting = await betSettingModel.findOne();
    const banNumbers = betSetting?.banNumbers;
    const newBanNumbers = banNumbers.filter((num) => num !== number);
    await betSettingModel.findByIdAndUpdate(
      {
        _id: betSetting._id,
      },
      {
        banNumbers: newBanNumbers,
      }
    );

    return response.success(res, "Deleted ban number successfully", {});
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
