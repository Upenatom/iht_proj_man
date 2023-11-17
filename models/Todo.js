const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoCommentSchema = new Schema(
  {
    todoComment: String,
    todoCommentStatus: Boolean,
    todoCommentOwner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const todoSchema = new Schema(
  {
    todo: String,
    todoStatus: Boolean,
    todoOwner: { type: Schema.Types.ObjectId, ref: "User" },
    todoComment: [todoCommentSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
