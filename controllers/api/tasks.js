const Task = require("../../models/Task");
const Project = require("../../models/Project");
module.exports = {
  create,
  myTasksIndex,
  projectTasksIndex,
  update,
  delete: deleteTask,
};

async function create(req, res) {
  try {
    let newTask = await Task.create({
      ...req.body,
      taskOwner: req.user._id,
      taskStatus: "Not Started",
      taskComments: [],
      taskTodo: [],
    });
    let project = await Project.findById(req.body.taskParentProject);
    project.projTasks.push(newTask._id);
    project.save();

    res.status(200).json("OK. New task added to Project!");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}

async function projectTasksIndex(req, res) {
  try {
    let projectTask = await Project.findById(req.params.projectid).populate([
      {
        path: "projTasks",
        populate: [{ path: "taskOwner" }],
      },
    ]);
    res.status(200).json(projectTask);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function myTasksIndex(req, res) {
  try {
    let myTasks = await Task.find({ taskOwner: req.user._id }).populate(
      "taskOwner"
    );
    res.status(200).json(myTasks);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function update(req, res) {
  const filter = { _id: req.params.taskid };
  const update = {
    taskStartDate: req.body.taskStartDate,
    taskTargetEndDate: req.body.taskTargetEndDate,
    taskDescription: req.body.taskDescription,
    taskPriority: req.body.taskPriority,
    taskStatus: req.body.taskStatus,
    taskOwner: req.body.taskOwner,
  };
  try {
    let task = await Task.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json("OK. Task updated");
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}

async function deleteTask(req, res) {
  try {
    console.log("req.user.id =>", typeof req.user._id);
    let task = await Task.findById(req.params.taskid);

    let project = await Project.findById(task.taskParentProject);
    console.log("project owner =>", typeof project.projOwner);
    let projectOwner = project.projOwner.toString();
    if (req.user._id === projectOwner) {
      let deletedTask = await Task.findByIdAndDelete(req.params.taskid);
      res.status(200).json(`Task and related comments deleted`);
    } else {
      res
        .status(403)
        .json(`You cannot delete the task if you are not the project owner`);
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
