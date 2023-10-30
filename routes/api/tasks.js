const express = require("express");
const router = express.Router();
const taskCtrl = require("../../controllers/api/tasks");

router.post("/create", taskCtrl.create);
router.put("/update/:taskid", taskCtrl.update);
router.get("/projectTasks/:projectid", taskCtrl.projectTasksIndex);
router.get("/myTasks/", taskCtrl.myTasksIndex);
router.delete("/delete/:taskid", taskCtrl.delete);

module.exports = router;
