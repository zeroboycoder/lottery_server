const { winnerModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.getWinners = async (req, res) => {
  try {
    const { type } = req.params;
    const { page = 1, showPerPage = 10, sort = "desc", agentId } = req.query;
    const options = agentId
      ? {
          agentId,
          type,
        }
      : { type };
    const results = await fetchData(
      winnerModel,
      page,
      showPerPage,
      sort,
      options,
      "bettingId"
    );

    let totalBetAmount = results.data.reduce((acc, cur) => {
      return acc + cur.betAmount;
    }, 0);
    let totalWinningAmount = results.data.reduce((acc, cur) => {
      return acc + cur.winningAmount;
    }, 0);

    return response.success(res, "Fetched winners successfully", {
      ...results,
      totalBetAmount,
      totalWinningAmount,
    });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
