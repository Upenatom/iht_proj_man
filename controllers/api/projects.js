const Project = require("../../models/Project");

module.exports = { create, myProjectsIndex };

async function create(req, res) {
  try {
    await Project.create({
      ...req.body,
      projOwner: req.user._id,
      projStatus: "Not Started",
      projectTasks: [],
      projDepartment: req.user.department,
    });
    res.status(200).json("OK. New project added to DB!");
  } catch (err) {
    res.json(err);
  }
}
async function myProjectsIndex(req, res) {
  try {
    let myProjects = await Project.find({ projOwner: req.user._id });
    res.status(200).json(myProjects);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
