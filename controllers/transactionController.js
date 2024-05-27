const { agentModel, transactionModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");

exports.createTransaction = async (req, res) => {
  try {
    const { phone, amount, date } = req.body;
    // check the agent by phone
    const isAgent = await agentModel.findOne({
      phone,
    });

    if (!isAgent) {
      return response.error(res, "Agent not found with this phone number.");
    }

    await transactionModel.create({
      agentId: isAgent._id,
      amount,
      date,
    });

    const transaction = await fetchData(
      transactionModel,
      1,
      10,
      "desc",
      {},
      "agentId"
    );

    return response.success(
      res,
      "Created transaction successfully",
      transaction
    );
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { page = 1, showPerPage = 10, sort = "desc", agentId } = req.query;
    const options = agentId
      ? {
          agentId,
        }
      : {};
    const results = await fetchData(
      transactionModel,
      page,
      showPerPage,
      sort,
      options,
      "agentId"
    );
    return response.success(res, "Fetched transaction successfully", results);
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
