const moment = require("moment");
const { winningNumberModel, bettingModel, winnerModel } = require("../models");
const response = require("../utils/response");

exports.monthlyReportController = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(
      moment(`${year}-${month}-01`).startOf("months").format("YYYY-MM-DD")
    );
    const endDate = new Date(
      moment(`${year}-${month}-01`).endOf("months").format("YYYY-MM-DD")
    );

    const winningNumbers = await winningNumberModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $project: {
          date: 1,
          winningNumber: 1,
          tootNumbers: 1,
        },
      },
    ]);

    const betingAmount = await bettingModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $project: {
          betting: 1,
        },
      },
      {
        $unwind: "$betting",
      },
      {
        $group: {
          _id: null,
          totalBetAmount: {
            $sum: "$betting.betAmount",
          },
        },
      },
    ]);

    const winningAmount = async (type) => {
      return await winnerModel.aggregate([
        {
          $match: {
            type,
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $project: {
            betAmount: 1,
            winningAmount: 1,
          },
        },
        {
          $group: {
            _id: null,
            totalWinningAmount: {
              $sum: "$winningAmount",
            },
          },
        },
      ]);
    };

    const totalDirectAmount = await winningAmount("direct");
    const totalDirectWinningAmount = totalDirectAmount[0]?.totalWinningAmount;

    const totalTootAmount = await winningAmount("toot");
    const totalTootWinningAmount = totalTootAmount[0]?.totalWinningAmount;

    const totalWinLose =
      betingAmount[0]?.totalBetAmount -
      (totalDirectWinningAmount + totalTootWinningAmount);

    return response.success(res, "Fetched monthly report", {
      winningNumbers,
      totalBetAmount: betingAmount[0]?.totalBetAmount,
      totalDirectWinningAmount,
      totalTootWinningAmount,
      totalWinningAmount: totalDirectWinningAmount + totalTootWinningAmount,
      totalWinLose,
    });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
