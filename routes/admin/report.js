const route = require("express").Router();
const reportController = require("../../controllers/reportController");
const jwt = require("../../middlewares/jwt");

route.get(
  "/montly-report/:month/:year",
  jwt.verifyJwt,
  reportController.monthlyReportController
);

module.exports = route;
