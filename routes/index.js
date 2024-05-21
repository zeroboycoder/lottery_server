const route = require("express").Router();
const adminRoute = require("./admin");
const agentRoute = require("./agent");

route.use("/hello-world", (req, res) => res.send("Hello World!"));
route.use("/admin", adminRoute);
route.use("/agent", agentRoute);

module.exports = route;
