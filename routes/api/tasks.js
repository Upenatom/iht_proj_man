const express = require("express");
const router = express.Router();
const taskCtrl = require("../../controllers/api/tasks");

router.post("/create", taskCtrl.create);
router.get("/projectTasks/:projectid", taskCtrl.projectTasksIndex);

module.exports = router;
