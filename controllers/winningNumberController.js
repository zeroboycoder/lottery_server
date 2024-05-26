const moment = require("moment");
const {
  winningNumberModel,
  bettingModel,
  winnerModel,
  betSettingModel,
} = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.createWinningNumber = async (req, res) => {
  try {
    const { number } = req.body;
    let tootNumbers = [];
    let lowerNum = parseInt(number) - 1;
    if (lowerNum < 100) lowerNum = "0" + lowerNum;
    let higherNum = parseInt(number) + 1;
    const betSetting = await betSettingModel.findOne();
    const odds = betSetting?.odds;

    if (!odds) {
      return response.error(res, "Please set odds first");
    }

    tootNumbers = [lowerNum, higherNum];
    // Create a winner number
    await winningNumberModel.create({
      winningNumber: number,
      tootNumbers,
      date: moment().format("YYYY-MM-DD"),
    });

    // Find the winning betting
    const winningBetting = await bettingModel
      .find({
        isChecked: false,
        betting: {
          $elemMatch: {
            betNumber: number,
          },
        },
      })
      .select("-createdAt -updatedAt -__v");

    // Create Winners
    await Promise.all(
      winningBetting.map(async (betting) => {
        let betAmount;
        betting.betting.filter((bet) => {
          bet.betNumber === number ? (betAmount = bet.betAmount) : null;
        });
        await winnerModel.create({
          playerName: betting.playerName,
          playerPhone: betting.playerPhone,
          bettingId: betting._id,
          agentId: betting.agentId,
          winningNumber: number,
          betAmount,
          date: new Date(moment().format("YYYY-MM-DD")),
          winningAmount: betAmount * odds,
        });
      })
    );

    // Update the isCheck in betting
    await bettingModel.updateMany(
      {
        isChecked: false,
      },
      {
        isChecked: true,
      }
    );
    return response.success(res, "Winning number created successfully");
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.getWinningNumber = async (req, res) => {
  try {
    const { page = 1, showPerPage = 10, sort = "desc" } = req.query;
    const results = await fetchData(
      winningNumberModel,
      page,
      showPerPage,
      sort
    );
    return response.success(
      res,
      "Fetched winning number successfully",
      results
    );
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
