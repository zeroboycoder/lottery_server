const route = require("express").Router();
const authController = require("../../controllers/authController");

route.post("/register", authController.agentRegister);

route.post("/login", authController.agentLogin);

module.exports = route;
