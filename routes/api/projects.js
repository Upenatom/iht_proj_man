const express = require("express");
const router = express.Router();
const projectCtrl = require("../../controllers/api/projects");

router.post("/create", projectCtrl.create);
router.get("/myProjects", projectCtrl.myProjectsIndex);

module.exports = router;
