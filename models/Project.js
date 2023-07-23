const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projName: String,
  projStartDate: Date,
  projTargetEndDate: Date,
  projDescription: String,
});

module.exports = mongoose.model("Project", projectSchema);
