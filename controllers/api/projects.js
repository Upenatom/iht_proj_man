const Project = require("../../models/Project");
const Task = require("../../models/Task");

module.exports = {
  create,
  myProjectsIndex,
  update,
  allProjects,
  projectFilters,
  delete: deleteProject,
};

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
  let filter;
  if (req.params.display === "Active") {
    filter = {
      [req.params.filter1]: [req.params.filter2],
      projStatus: { $in: ["Not Started", "In Progress"] },
      projOwner: req.user._id,
    };
  }
  if (req.params.display === "Inactive") {
    filter = {
      [req.params.filter1]: [req.params.filter2],
      projStatus: { $in: ["Cancelled", "Completed", "Paused"] },
      projOwner: req.user._id,
    };
  }
  if (req.params.display === "All" || req.params.display === "All") {
    filter = {
      [req.params.filter1]: [req.params.filter2],
      projOwner: req.user._id,
    };
  }
  try {
    const filteredProject = await Project.find(filter)
      .sort({
        projTargetEndDate: "asc",
      })
      .populate(
        // "projOwner"
        [({ path: "projOwner" }, { path: "projTasks", select: "taskStatus" })]
      );

    res.status(200).json(filteredProject);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function update(req, res) {
  console.log("contoller hit!!!");
  const filter = { _id: req.params.projectid };
  const update = {
    projName: req.body.projName,
    projStatus: req.body.projStatus,
    projDivision: req.body.projDivision,
    projStartDate: req.body.projStartDate,
    projTargetEndDate: req.body.projTargetEndDate,
    projDescription: req.body.projDescription,
    projDepartment: req.body.projDepartment,
    projOwner: req.body.projOwner,
    projRequirements: req.body.projRequirements,
  };
  console.log("update==>", update);
  try {
    if (
      req.user._id === update.projOwner ||
      req.user.authLevel === "admin" ||
      req.user.authLevel === "superadmin"
    ) {
      console.log("finding");
      let project = await Project.findOneAndUpdate(filter, update);

      res.status(200).json("OK. Project updated ");
    }
  } catch (err) {
    console.log(err);
  }
}

async function allProjects(req, res) {
  try {
    let allProjects = await Project.find()
      .sort({
        projTargetEndDate: "asc",
      })
      .populate("projOwner");
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
async function projectFilters(req, res) {
  let filter;
  if (req.params.display === "Active") {
    filter = {
      [req.params.filter1]: [req.params.filter2],
      projStatus: { $in: ["Not Started", "In Progress"] },
    };
  }
  if (req.params.display === "Inactive") {
    filter = {
      [req.params.filter1]: [req.params.filter2],
      projStatus: { $in: ["Cancelled", "Completed", "Paused"] },
    };
  }
  if (req.params.display === "All" || req.params.display === "All") {
    filter = { [req.params.filter1]: [req.params.filter2] };
  }
  try {
    const filteredProject = await Project.find(filter)
      .sort({
        projTargetEndDate: "asc",
      })
      .populate(
        // "projOwner"
        { path: "projTasks", select: "taskStatus" }
      )

      .populate({ path: "projOwner" });

    res.status(200).json(filteredProject);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function deleteProject(req, res) {
  try {
    //find project first
    let project = await Project.findById(req.params._id);

    //delete all tasks first
    for await (const taskid of project.projTasks) {
      let deleteTask = await Task.findByIdAndDelete(taskid);
    }
    let deletedProject = await findByIdAndDelete(req.params._id);
    res.status(200).json(`Project and related Tasks and comments deleted`);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}
