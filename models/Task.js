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
    taskStatus: Boolean,
    taskComment: [taskCommentSchema],
    taskOwner: { type: Schema.Types.ObjectId, ref: "User" },
    taskTodo: { type: Schema.Types.ObjectId, ref: "Todo" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
