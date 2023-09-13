const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  create,
  login,
};

async function create(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.userPass,
      parseInt(process.env.SALT_ROUNDS)
    );

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      authLevel: req.body.authLevel,
      statusLevel: "active",
      userName: req.body.userName,
      userPass: hashedPassword,
    });

    const token = jwt.sign({ user }, process.env.SECRET);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {}
