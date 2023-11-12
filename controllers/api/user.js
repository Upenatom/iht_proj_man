const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  update,
  updatePass,
};
async function update(req, res) {
  let id = req.params.id;
  let updateData = req.body;
  const options = { new: true };
  try {
    if (req.user.authLevel === "admin" || req.user.authLevel === "superadmin") {
      const hashedPassword = await bcrypt.hash(
        req.body.userPass,
        parseInt(process.env.SALT_ROUNDS)
      );
      updateData = { ...updateData, userPass: hashedPassword };
      const user = await User.findByIdAndUpdate(id, updateData, options);
      res
        .status(200)
        .json(`User ${user.firstName} ${user.lastName} has been updated`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function updatePass(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!(await bcrypt.compare(req.body.currentPass, user.userPass))) {
      throw new Error("Bad Password");
    }

    const hashedPassword = await bcrypt.hash(
      req.body.userPass,
      parseInt(process.env.SALT_ROUNDS)
    );

    user.userPass = hashedPassword;
    const result = await user.save();

    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });
    const response = {
      token: token,
      message: "ok",
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
}
