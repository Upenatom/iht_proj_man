const express = require("express");
const router = express.Router();
const commentCtrl = require("../../controllers/api/comments");

router.post("/projectTasks/:taskid/comments/create", commentCtrl.create);
router.get("/projectComments/:taskid/", commentCtrl.index);
router.get("/projectComments/:taskid/getfirst", commentCtrl.getfirst);

module.exports = router;
