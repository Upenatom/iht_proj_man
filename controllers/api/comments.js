const Task = require("../../models/Task");
const Project = require("../../models/Project");
module.exports = { create, index, getfirst };

async function create(req, res) {
  try {
    let task = await Task.findById(req.params.taskid);

    let newComment = { ...req.body, taskCommentOwner: req.user._id };

    let taskCommentArray = task.taskComments;
    taskCommentArray.push(newComment);
    task.save();
    res.status(200).json("Comment added to task");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
async function index(req, res) {
  try {
    let task = await Task.findById(req.params.taskid).populate([
      {
        path: "taskComments",
        populate: [{ path: "taskCommentOwner" }],
      },
    ]);
    const taskComments = task.taskComments;
    //sort to ascending and return to frontend
    let reverseTaskComments = taskComments.toReversed();

    res.status(200).json(reverseTaskComments);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function getfirst(req, res) {
  try {
    let taskComments = await Task.findById(req.params.taskid).populate([
      {
        path: "taskComments",
        populate: [{ path: "taskCommentOwner" }],
      },
    ]);
    let commentArray = taskComments.taskComments;
    firstComment = commentArray.slice(-1);
    res.status(200).json(firstComment);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
