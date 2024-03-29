const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectMeetingSchema = new Schema(
  {
    minuteKeeper: { type: Schema.Types.ObjectId, ref: "User" },
    date: Date,
    details: String,
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    projName: String,
    projStatus: {
      type: String,
      required: true,
      enum: ["In Progress", "Paused", "Cancelled", "Completed", "Not Started"],
    },
    projDivision: {
      type: String,
      required: true,
      enum: [
        "IHTheating",
        "IHTcooling",
        "IHTlighting",
        "IHTplastic",
        "IHTgroup",
      ],
    },
    projStartDate: { type: Date, required: true },
    projTargetEndDate: Date,
    projDescription: String,
    projDepartment: String,
    projRequirements: [String],
    projMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projOwner: { type: Schema.Types.ObjectId, ref: "User" },
    projTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    projBudget: Number,
    projMeetings: [projectMeetingSchema],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
