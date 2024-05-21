const { agentModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.fetchAgents = async (req, res) => {
  try {
    const { page = 1, showPerPage = 10, sort = "desc" } = req.query;
    const result = await fetchData(agentModel, page, showPerPage, sort);

    return response.success(res, "Fetched agents successfully", result);
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
