const { bettingModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.createBetting = async (req, res) => {
  try {
    const { playerName, playerPhone, agentId, betting } = req.body;
    // Create betting
    await bettingModel.create({
      playerName,
      playerPhone,
      agentId,
      betting,
    });

    return response.success(res, "Betting created successfully", {});
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.fetchBetting = async (req, res) => {
  try {
    const { page = 1, showPerPage = 10, sort = "desc" } = req.query;
    const results = await fetchData(bettingModel, page, showPerPage, sort);
    const data = [];

    results?.data.map((result) => {
      let tempData = {};
      let betNumbers = [];
      let betAmount = 0;

      Promise.all(
        result?.betting.map((betting) => {
          betNumbers.push(betting.betNumber);
          betAmount += betting.betAmount;
        })
      );

      tempData = result;
      tempData.betNumber = betNumbers;
      tempData.betAmount = betAmount;
      data.push(tempData);
    });

    return response.success(res, "Betting fetched successfully", {
      data,
      currentPage: results.currentPage,
      totalPages: results.totalPages,
      showPerPage: results.showPerPage,
      totalCount: results.totalCount,
    });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
