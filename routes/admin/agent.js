const route = require("express").Router();
const agentController = require("../../controllers/agentController");
const jwt = require("../../middlewares/jwt");

route.get("/", jwt.verifyJwt, agentController.fetchAgents);

module.exports = route;
