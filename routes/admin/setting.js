const route = require("express").Router();
const adminSettingController = require("../../controllers/adminSettingController");
const jwt = require("../../middlewares/jwt");

route.post(
  "/ban-number",
  jwt.verifyJwt,
  adminSettingController.createBanNumber
);

route.delete(
  "/ban-number",
  jwt.verifyJwt,
  adminSettingController.deleteBanNumber
);

module.exports = route;
