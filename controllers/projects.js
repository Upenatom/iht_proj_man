const Project = require("../models/Project");

module.exports = { create };

async function create(req, res) {
  try {
    await Project.create({
      projName: req.body.projName,
      projStartDate: req.body.projStartDate,
      projTargetEndDate: req.body.projTargetEndDate,
      projDescription: req.body.projDescription,
    });
    res.status(200).json("OK. New project added to DB!");
  } catch (err) {
    res.json(err);
  }
}
