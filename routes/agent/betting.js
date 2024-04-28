const route = require("express").Router();
const bettingController = require("../../controllers/bettingController");
const jwt = require("../../middlewares/jwt");

route.post("/", jwt.verifyJwt, bettingController.createBetting);

route.get("/", jwt.verifyJwt, bettingController.fetchBetting);

module.exports = route;
