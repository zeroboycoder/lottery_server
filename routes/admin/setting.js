const route = require("express").Router();
const adminSettingController = require("../../controllers/adminSettingController");
const jwt = require("../../middlewares/jwt");

route.get("/ban-number", jwt.verifyJwt, adminSettingController.getBanNumber);

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

route.get(
  "/limit-number",
  jwt.verifyJwt,
  adminSettingController.getLimitNumerAmount
);

route.post(
  "/limit-number",
  jwt.verifyJwt,
  adminSettingController.createLimitNumberAmount
);

route.delete(
  "/limit-number",
  jwt.verifyJwt,
  adminSettingController.deleteLimitNumber
);

route.get("/odds", jwt.verifyJwt, adminSettingController.getOdds);

route.post("/odds", jwt.verifyJwt, adminSettingController.createOdds);

module.exports = route;
