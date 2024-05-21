const route = require("express").Router();
const bettingController = require("../../controllers/bettingController");
const jwt = require("../../middlewares/jwt");

route.get("/", jwt.verifyJwt, bettingController.fetchBetting);

module.exports = route;
