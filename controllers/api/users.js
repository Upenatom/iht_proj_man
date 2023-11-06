const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  create,
  login,
  getUsersByDepartment,
  index,
};

async function create(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let fullName = firstName.concat(" ");
  fullName = fullName.concat(lastName);
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.userPass,
      parseInt(process.env.SALT_ROUNDS)
    );

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: fullName,
      authLevel: req.body.authLevel,
      statusLevel: "active",
      department: req.body.department,
      userName: req.body.userName,
      userPass: hashedPassword,
    });

    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
    console.log(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  console.log("route hit");
  try {
    const user = await User.findOne({
      userName: req.body.userName,
    });
    if (!(await bcrypt.compare(req.body.userPass, user.userPass)))
      throw new Error("Bad Password");
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}
async function getUsersByDepartment(req, res) {
  try {
    const usersByDept = await User.find({
      department: req.params.department,
    }).select("-userPass");
    res.status(200).json(usersByDept);
  } catch (err) {
    console.log(err);
  }
}

async function index(req, res) {
  try {
    const allUsers = await User.find({}).select("-userPass");
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
  }
}
