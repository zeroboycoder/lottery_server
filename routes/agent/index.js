const route = require("express").Router();
const authRoute = require("./auth");
const bettingRoute = require("./betting");
const dashboardRoute = require("./dashboard");

route.use("/auth", authRoute);
route.use("/betting", bettingRoute);
route.use("/dashboard", dashboardRoute);

module.exports = route;
