const Task = require("../../models/Task");
const Project = require("../../models/Project");
module.exports = { create, myTasksIndex, projectTasksIndex };

async function create(req, res) {
  try {
    console.log("Tasks controller hit");
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
    let myProjects = await Task.find({ projOwner: req.user._id });
    res.status(200).json(myProjects);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
