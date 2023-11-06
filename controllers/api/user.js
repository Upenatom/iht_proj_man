const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  update,
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
