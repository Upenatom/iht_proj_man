const Project = require("../../models/Project");

module.exports = { create, myProjectsIndex, update };

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
    let myProjects = await Project.find({ projOwner: req.user._id }).sort({
      projTargetEndDate: "desc",
    });
    res.status(200).json(myProjects);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function update(req, res) {
  const filter = { _id: req.params.projectid };
  const update = {
    projName: req.body.projName,
    projStatus: req.body.projStatus,
    projDivision: req.body.projDivision,
    projStartDate: req.body.projStartDate,
    projTargetEndDate: req.body.projTargetEndDate,
    projDescription: req.body.projDescription,
    projDepartment: req.body.projDepartment,
    projMembers: req.body.projMembers,
    projOwner: req.body.projOwner,
    projTasks: req.body.projTasks,
  };
  try {
    if (req.user._id === update.projOwner) {
      let project = await Project.findOneAndUpdate(filter, update, {
        new: true,
      });

      res.status(200).json("OK. Project updated ");
    }
  } catch (err) {
    console.log(error);
  }
}
