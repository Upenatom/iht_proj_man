const Task = require("../../models/Task");
const Project = require("../../models/Project");
module.exports = { create, index, getfirst };

async function create(req, res) {
  console.log("comment controller hit");
  try {
    let task = await Task.findById(req.params.taskid);

    let newComment = { ...req.body, taskCommentOwner: req.user._id };

    let taskArray = task.taskComments;
    taskArray.push(newComment);
    task.save();
    res.status(200).json("Comment added to task");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
async function index(req, res) {
  console.log("index controller hit");
  try {
    let taskComments = await Task.findById(req.params.taskid);
    res.status(200).json(taskComments.taskComments);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function getfirst(req, res) {
  try {
    console.log("get first comment controller hit");
    let taskComments = await Task.findById(req.params.taskid);
    let commentArray = taskComments.taskComments;
    firstComment = commentArray.slice(-1);
    res.status(200).json(firstComment);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
