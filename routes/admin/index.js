const route = require("express").Router();
const authRoute = require("./auth");
const winningNumberRoute = require("./winningNumber");
const dashboardRoute = require("./dashboard");
const winnerRoute = require("./winner");
const bettingRoute = require("./betting");
const agentRoute = require("./agent");
const adminSettingRoute = require("./setting");

route.use("/auth", authRoute);
route.use("/winning-number", winningNumberRoute);
route.use("/dashboard", dashboardRoute);
route.use("/winner", winnerRoute);
route.use("/betting", bettingRoute);
route.use("/agent", agentRoute);
route.use("/setting", adminSettingRoute);

module.exports = route;
