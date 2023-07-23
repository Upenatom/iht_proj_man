const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todoTitle: String,
    todoStartDate: Date,
    todoTargetEndDate: Date,
    todoDescription: String,
    todoStatus: Boolean,
    todoOwner: { type: Schema.Types.ObjectId, ref: "User" },
    todoComment: { type: Schema.Types.ObjectId, ref: "TodoComment" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
