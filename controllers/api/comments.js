const Task = require("../../models/Task");
const Project = require("../../models/Project");
module.exports = { create };
async function create(req, res) {
  console.log("comment controller hit");
  try {
    let task = await Task.findById(req.params.projectid);
    console.log("task==>", task);
    let newComment = { ...req.body, taskCommentOwner: req.user._id };
    console.log(newComment);
    let taskArray = task.taskComments;
    taskArray.push(newComment);
    task.save();
    res.status(200).json("Comment added to task");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
