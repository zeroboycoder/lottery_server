const bcrypt = require("bcrypt");
const { adminModel, agentModel } = require("../models");
const response = require("../utils/response");
const jwt = require("../middlewares/jwt");

exports.adminRegister = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    // Check the phone is already registered
    const admin = await adminModel.findOne({
      phone,
    });
    if (admin) {
      return response.error(res, "This phone number is already registered.");
    }

    // Create an admin
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAdmin = await adminModel.create({
      name,
      phone,
      password: hashedPassword,
    });

    // Sign the jwt
    const token = jwt.signJwt({ _id: newAdmin._id, admin: true });
    return response.success(res, "Admin created successfully", { token });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const admin = await adminModel.findOne({
      phone,
    });
    if (!admin) {
      return response.error(res, "Admin not found with this phone number.");
    }

    // Check the password
    const matchPassword = bcrypt.compareSync(password, admin.password);
    if (!matchPassword) {
      return response.error(res, "Password is incorrect.");
    }

    // Sign the jwt
    const token = jwt.signJwt({ _id: admin._id, admin: true });
    return response.success(res, "Admin login successfully", { token });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.agentRegister = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    // Check the phone is already registered
    const agent = await agentModel.findOne({
      phone,
    });
    if (agent) {
      return response.error(res, "This phone number is already registered.");
    }

    // Create an agent
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newAgent = await agentModel.create({
      name,
      phone,
      password: hashedPassword,
    });

    // Sign the jwt
    const token = jwt.signJwt({ _id: newAgent._id, agent: true });
    return response.success(res, "Agent created successfully", { token });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};

exports.agentLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const agent = await agentModel.findOne({
      phone,
    });
    if (!agent) {
      return response.error(res, "Agent not found with this phone number.");
    }

    // Check the password
    const matchPassword = bcrypt.compareSync(password, agent.password);
    if (!matchPassword) {
      return response.error(res, "Password is incorrect.");
    }

    // Sign the jwt
    const token = jwt.signJwt({ _id: agent._id, agent: true });
    return response.success(res, "Agent login successfully", { token });
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
