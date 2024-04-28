const route = require("express").Router();
const winningNumberController = require("../../controllers/winningNumberController");
const jwt = require("../../middlewares/jwt");

route.post("/", jwt.verifyJwt, winningNumberController.createWinningNumber);

route.get("/", jwt.verifyJwt, winningNumberController.getWinningNumber);

module.exports = route;
