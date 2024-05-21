const route = require("express").Router();
const winnerController = require("../../controllers/winnerController");
const jwt = require("../../middlewares/jwt");

route.get("/", jwt.verifyJwt, winnerController.getWinners);

module.exports = route;
