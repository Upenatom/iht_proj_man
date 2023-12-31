const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskCommentSchema = new Schema(
  {
    comment: String,
    taskCommentOwner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const taskSchema = new Schema(
  {
    taskStartDate: Date,
    taskTargetEndDate: Date,
    taskDescription: String,
    taskPriority: {
      type: String,
      enum: ["1-High", "2-Medium", "3-Low"],
    },
    taskStatus: {
      type: String,
      required: true,
      enum: ["In Progress", "Paused", "Cancelled", "Completed", "Not Started"],
    },
    taskComments: [taskCommentSchema],
    taskOwner: { type: Schema.Types.ObjectId, ref: "User" },
    taskTodos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
    taskParentProject: { type: Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
