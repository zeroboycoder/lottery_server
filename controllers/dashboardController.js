const moment = require("moment");
const { bettingModel } = require("../models");
const response = require("../utils/response");

exports.todayBetCount = async (req, res) => {
  try {
    const user = req.user;
    const startTime = new Date(
      moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")
    );
    const endTime = new Date(
      moment().endOf("day").format("YYYY-MM-DD HH:mm:ss")
    );
    let result;
    if (req.isAdmin) {
      result = await bettingModel.countDocuments({
        createdAt: {
          $gte: startTime,
          $lte: endTime,
        },
      });
    } else {
      result = await bettingModel.countDocuments({
        agentId: user._id,
        createdAt: {
          $gte: startTime,
          $lte: endTime,
        },
      });
    }
    return response.success(res, "Fetched today bet count", {
      count: result,
    });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
