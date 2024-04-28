const { winningNumberModel, bettingModel, winnerModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.createWinningNumber = async (req, res) => {
  try {
    const { number } = req.body;
    let tootNumbers = [];
    let lowerNum = parseInt(number) - 1;
    if (lowerNum < 100) lowerNum = "0" + lowerNum;
    let higherNum = parseInt(number) + 1;

    tootNumbers = [lowerNum, higherNum];
    // Create a winner number
    await winningNumberModel.create({
      winningNumber: number,
      tootNumbers,
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
      .select("-betting -createdAt -updatedAt -__v");

    // Create Winners
    await Promise.all(
      winningBetting.map(async (betting) => {
        await winnerModel.create({
          playerName: betting.playerName,
          playerPhone: betting.playerPhone,
          bettingId: betting._id,
          winningNumber: number,
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
      "Winning number created successfully",
      results
    );
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
