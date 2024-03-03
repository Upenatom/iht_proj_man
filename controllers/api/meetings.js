mongoose = require("mongoose");
const Project = require("../../models/Project");
module.exports = { create, index, delete: remove, update };

async function create(req, res) {
  try {
    let project = await Project.findById(req.params.projectid);
    let newMeeting = { ...req.body, minuteKeeper: req.user.id };
    let meetingArray = project.projMeetings;
    meetingArray.push(newMeeting);
    project.save();
    res
      .status(200)
      .json(`new meeting added to project ${req.params.projectid}`);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
async function index(req, res) {
  try {
    let project = await Project.findById(req.params.projectid).populate([
      { path: "projMeetings" },
    ]);

    let allMeetings = project.projMeetings;
    allMeetings = allMeetings.sort((a, b) => b.date - a.date);

    res.status(200).json(allMeetings);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}

async function remove(req, res) {
  try {
    let project = await Project.findById(req.params.projectid);
    let meeting = project.projMeetings.pull({ _id: req.params.meetingid });
    await project.save();

    res.status(200).json(`meeting has been deleted`);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}

async function update(req, res) {
  try {
    let project = await Project.findOneAndUpdate(
      {
        id: req.params.projectid,
        "projMeetings._id": req.params.meetingid,
      },
      {
        "projMeetings.$.date": req.body.date,
        "projMeetings.$.details": req.body.details,
      }
    );
    console.log(project);

    // project.save;
    res.status(200).json(`meeting ${req.params.meetingid} has been updated`);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
}
