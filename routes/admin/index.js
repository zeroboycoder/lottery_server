const route = require("express").Router();
const authRoute = require("./auth");
const winningNumberRoute = require("./winningNumber");
const dashboardRoute = require("./dashboard");

route.use("/auth", authRoute);
route.use("/winning-number", winningNumberRoute);
route.use("/dashboard", dashboardRoute);

module.exports = route;
