const route = require("express").Router();
const winnerController = require("../../controllers/winnerController");
const jwt = require("../../middlewares/jwt");

route.get("/:type", jwt.verifyJwt, winnerController.getWinners);

module.exports = route;
