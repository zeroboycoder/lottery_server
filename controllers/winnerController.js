const { winnerModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.getWinners = async (req, res) => {
  try {
    const { page = 1, showPerPage = 10, sort = "desc", agentId } = req.query;
    const options = agentId
      ? {
          agentId,
        }
      : {};
    const results = await fetchData(
      winnerModel,
      page,
      showPerPage,
      sort,
      options,
      "bettingId"
    );
    return response.success(res, "Fetched winners successfully", results);
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
