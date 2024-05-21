const route = require("express").Router();
const authRoute = require("./auth");
const bettingRoute = require("./betting");
const winnerRoute = require("./winner");
const dashboardRoute = require("./dashboard");

route.use("/auth", authRoute);
route.use("/betting", bettingRoute);
route.use("/dashboard", dashboardRoute);
route.use("/winner", winnerRoute);

module.exports = route;
