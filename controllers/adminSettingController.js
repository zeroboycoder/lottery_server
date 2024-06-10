const { betSettingModel } = require("../models");
const response = require("../utils/response");

exports.getBanNumber = async (req, res) => {
  try {
    const betSetting = await betSettingModel.findOne();
    const banNumbers = betSetting?.banNumbers;

    return response.success(res, "Fetched ban number successfully", banNumbers);
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.createBanNumber = async (req, res) => {
  try {
    const { number } = req.body;
    // Find the ban numbers and push the new number
    const betSetting = await betSettingModel.findOne();

    if (betSetting?.banNumbers) {
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

    return response.success(res, "Added ban number successfully", {});
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

// Limit Amount Controller
exports.getLimitNumerAmount = async (req, res) => {
  try {
    const betSetting = await betSettingModel.findOne();
    const limitAmount = betSetting?.limitAmount;

    return response.success(
      res,
      "Fetched limit amount successfully",
      limitAmount
    );
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.createLimitNumberAmount = async (req, res) => {
  try {
    const { number, amount } = req.body;
    const betSetting = await betSettingModel.findOne();

    if (betSetting?.limitAmount) {
      const limitAmounts = betSetting?.limitAmount;
      const isExist = limitAmounts.some(
        (limitAmount) => limitAmount.number === number
      );
      if (isExist) {
        return response.error(res, "This number is already limited.");
      }

      await betSettingModel.findByIdAndUpdate(
        {
          _id: betSetting._id,
        },
        {
          limitAmount: [
            ...limitAmounts,
            {
              number,
              amount,
            },
          ],
        }
      );
    } else {
      const limitAmount = [
        {
          number,
          amount,
        },
      ];
      await betSettingModel.create({
        limitAmount: limitAmount,
      });
    }

    const updatedBetSetting = await betSettingModel.findOne();
    const updatedAmount = updatedBetSetting?.limitAmount;

    return response.success(
      res,
      "Added ban number successfully",
      updatedAmount
    );
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.deleteLimitNumber = async (req, res) => {
  try {
    const { number } = req.body;
    const betSetting = await betSettingModel.findOne();
    const limitAmount = betSetting?.limitAmount;
    const newLimitAmount = limitAmount.filter((num) => {
      if (num.number !== number) return num;
    });
    await betSettingModel.findByIdAndUpdate(
      {
        _id: betSetting._id,
      },
      {
        limitAmount: newLimitAmount,
      }
    );

    console.log(req.body);
    console.log(number);
    console.log(newLimitAmount);

    return response.success(
      res,
      "Deleted limit number successfully",
      newLimitAmount
    );
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

// Betting Odds
exports.getOdds = async (req, res) => {
  try {
    const betSetting = await betSettingModel.findOne();
    const odds = betSetting?.odds;
    const tootOdds = betSetting?.tootOdds;

    return response.success(res, "Fetched odds successfully", {
      odds,
      tootOdds,
    });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.createOdds = async (req, res) => {
  try {
    const { odds, tootOdds } = req.body;
    const betSetting = await betSettingModel.findOne();

    if (betSetting) {
      await betSettingModel.findByIdAndUpdate(
        {
          _id: betSetting._id,
        },
        {
          odds,
          tootOdds,
        }
      );
    } else {
      await betSettingModel.create({
        odds,
        tootOdds,
      });
    }

    const updatedBetSetting = await betSettingModel.findOne();
    const updatedOdds = updatedBetSetting?.odds;
    const updatedTootOdds = updatedBetSetting?.tootOdds;

    return response.success(res, "Update odds successfully", {
      odds: updatedOdds,
      tootOdds: updatedTootOdds,
    });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
