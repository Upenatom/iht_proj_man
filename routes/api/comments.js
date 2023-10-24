const express = require("express");
const router = express.Router();
const taskCtrl = require("../../controllers/api/comments");

router.post("/projectTasks/:projectid/comments/create", taskCtrl.create);

module.exports = router;
