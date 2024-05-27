const route = require("express").Router();
const transactionController = require("../../controllers/transactionController");
const jwt = require("../../middlewares/jwt");

route.get("/", jwt.verifyJwt, transactionController.getTransaction);

route.post("/", jwt.verifyJwt, transactionController.createTransaction);

module.exports = route;
