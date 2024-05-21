require("dotenv").config();
const jwt = require("jsonwebtoken");
const { adminModel, agentModel } = require("../models");
const { JWT_SECRET_KEY } = process.env;
const response = require("../utils/response");

exports.signJwt = (data) => jwt.sign(data, JWT_SECRET_KEY);

exports.verifyJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).send({
        status: "error",
        msg: "There's no token.",
        data: "",
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.admin === true) {
      req.user = await adminModel
        .findById({ _id: decoded._id })
        .select("-createdAt -updatedAt -__v");
      req.isAdmin = decoded?.admin;
    } else if (decoded.agent === true) {
      req.user = await agentModel
        .findById({ _id: decoded._id })
        .select("-createdAt -updatedAt -__v");
    }
    req.userId = decoded._id;
    req.isAdmin = decoded.admin === true ? true : false;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        status: "error",
        msg: "Token has expired.",
        data: "",
      });
    }
    console.log(error);
    return response.error(res, error.message);
  }
};
