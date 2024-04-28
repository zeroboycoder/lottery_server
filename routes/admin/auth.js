const route = require("express").Router();
const authController = require("../../controllers/authController");

route.post("/register", authController.adminRegister);

route.post("/login", authController.adminLogin);

module.exports = route;
