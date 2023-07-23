const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoCommentSchema = new Schema(
  {
    todoComment: String,
    todoCommentStartDate: Date,
    todoCommentTargetEndDate: Date,
    todoCommentStatus: Boolean,
    todoCommentOwner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
