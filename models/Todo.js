const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todo: String,
    todoStatus: Boolean,
    todoOwner: { type: Schema.Types.ObjectId, ref: "User" },
    todoComment: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
