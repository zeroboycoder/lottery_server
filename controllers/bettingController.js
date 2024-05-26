const { bettingModel, betSettingModel } = require("../models");
const response = require("../utils/response");
const { fetchData } = require("../utils/dataSource");
const moment = require("moment");

exports.createBetting = async (req, res) => {
  try {
    const { playerName, playerPhone, agentId, betting } = req.body;
    const betSetting = await betSettingModel.findOne();
    const banNumbers = betSetting?.banNumbers;
    const limitAmounts = betSetting?.limitAmount;

    // Check the betting number is banned
    let hasBanNumbers = [];

    if (betSetting) {
      const banNumbers = betSetting.banNumbers || [];
      for (const banNumber of banNumbers) {
        betting.map(
          (bet) =>
            bet.betNumber === banNumber && hasBanNumbers.push(bet.betNumber)
        );
      }
    }

    if (hasBanNumbers.length > 0) {
      return response.error(
        res,
        `${hasBanNumbers.join(", ")} numbers are banned.`
      );
    }

    // Check the limit amount
    let isReachLimited = false;
    const reachedNumber = [];
    const limitedNumbers = [];
    await Promise.all(
      limitAmounts?.map((num) => {
        return betting.map((bet) => {
          if (bet.betNumber === num.number) {
            limitedNumbers.push(num);
          }
        });
      })
    );
    if (limitedNumbers?.length > 0) {
      await Promise.all(
        limitedNumbers.map(async (limitedNumber) => {
          const totalBetDatas = await bettingModel.find({
            isChecked: false,
            betting: {
              $elemMatch: {
                betNumber: limitedNumber.number,
              },
            },
          });

          let alreadyBettingAmount = 0;

          totalBetDatas.map((data) => {
            return data.betting.map((b) => {
              if (b.betNumber === limitedNumber.number)
                alreadyBettingAmount += b.betAmount;
            });
          });

          if (alreadyBettingAmount >= limitedNumber.amount) {
            isReachLimited = isReachLimited || true;
            reachedNumber.push(limitedNumber.number);
          }
        })
      );
    }

    if (isReachLimited) {
      return response.error(
        res,
        `${reachedNumber.join(", ")} numbers are reached the limit amount.`
      );
    }

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
    const userId = req.userId;
    const isAdmin = req.isAdmin;
    const { page = 1, showPerPage = 10, sort = "desc" } = req.query;
    const options = isAdmin
      ? {}
      : {
          agentId: userId,
        };
    const results = await fetchData(
      bettingModel,
      page,
      showPerPage,
      sort,
      options
    );
    const data = [];

    results?.data.map((result, i) => {
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
      tempData.id = ++i;
      tempData.betDate = moment(result.createdAt).format("YYYY-MM-DD hh:mm a");
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
