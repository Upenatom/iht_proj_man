const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectRequirementSchema = new Schema(
  {
    requirement: String,
    requirementmet: Boolean,
  },
  { timestamps: true }
);
const projectSchema = new Schema({
  projName: String,
  projStartDate: Date,
  projTargetEndDate: Date,
  projDescription: String,
  projectRequirements: [projectRequirementSchema],
  projectOwner: { type: Schema.Types.ObjectId, ref: "User" },
  projectTask: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Project", projectSchema);
