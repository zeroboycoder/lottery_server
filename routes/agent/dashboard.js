const route = require("express").Router();
const dashboardController = require("../../controllers/dashboardController");
const jwt = require("../../middlewares/jwt");

route.get("/today-bet-count", jwt.verifyJwt, dashboardController.todayBetCount);

route.get("/total-bet-count", jwt.verifyJwt, dashboardController.totalBetCount);

module.exports = route;
