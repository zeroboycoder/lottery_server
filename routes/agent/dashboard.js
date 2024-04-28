const route = require("express").Router();
const dashboardController = require("../../controllers/dashboardController");
const jwt = require("../../middlewares/jwt");

route.get("/bet-count", jwt.verifyJwt, dashboardController.todayBetCount);

module.exports = route;
