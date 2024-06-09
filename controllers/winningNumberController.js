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
    const tootOdds = betSetting?.tootOdds;

    if (!odds) {
      return response.error(res, "Please set odds first");
    }
    if (!tootOdds) {
      return response.error(res, "Please set toot odds first");
    }

    for (let i = 0; i < 3; i++) {
      let numberStr = number + "";
      if (i === 0) {
        tootNumbers.push(numberStr[0] + numberStr[2] + numberStr[1]);
      } else if (i === 1) {
        tootNumbers.push(numberStr[1] + numberStr[0] + numberStr[2]);
        tootNumbers.push(numberStr[1] + numberStr[2] + numberStr[0]);
      } else if (i === 2) {
        tootNumbers.push(numberStr[2] + numberStr[0] + numberStr[1]);
        tootNumbers.push(numberStr[2] + numberStr[1] + numberStr[0]);
      }
    }
    tootNumbers.push(lowerNum);
    tootNumbers.push(higherNum);

    // Create a winning number
    await winningNumberModel.create({
      winningNumber: number,
      tootNumbers,
      date: moment().format("YYYY-MM-DD"),
    });

    // Function for fetch the winning betting
    const fetchWinnningBetting = async (num) => {
      return await bettingModel
        .find({
          isChecked: false,
          betting: {
            $elemMatch: {
              betNumber: num,
            },
          },
        })
        .select("-createdAt -updatedAt -__v");
    };

    // Function for create winners
    const createWinner = async (betting, betNumber, betAmount, type) => {
      await winnerModel.create({
        playerName: betting.playerName,
        playerPhone: betting.playerPhone,
        bettingId: betting._id,
        agentId: betting.agentId,
        winningNumber: betNumber,
        betAmount,
        date: new Date(moment().format("YYYY-MM-DD")),
        winningAmount:
          type === "direct" ? betAmount * odds : betAmount * tootOdds,
        type,
      });
    };

    // Find the direct winning betting
    // if winning betting found, create the direct winners
    const winningBettings = await fetchWinnningBetting(number);
    if (winningBettings.length > 0) {
      await Promise.all(
        winningBettings.map(async (winningBetting) => {
          const betAmount = winningBetting.betting.filter(
            (bet) => bet.betNumber === number
          )[0].betAmount;
          await createWinner(winningBetting, number, betAmount, "direct");
        })
      );
    }

    // Find the toot winning betting
    // if winning betting found, create the toot winners
    await Promise.all(
      tootNumbers.map(async (tootNumber) => {
        const tootWinningBettings = await fetchWinnningBetting(tootNumber);
        if (tootWinningBettings.length > 0) {
          await Promise.all(
            tootWinningBettings.map(async (tootWinningBetting) => {
              const betAmount = tootWinningBetting.betting.filter(
                (bet) => bet.betNumber === tootNumber
              )[0].betAmount;
              await createWinner(
                tootWinningBetting,
                tootNumber,
                betAmount,
                "toot"
              );
            })
          );
        }
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
