const express = require("express");
const router = express.Router();
const projectCtrl = require("../../controllers/api/projects");

router.post("/create", projectCtrl.create);
router.get("/myProjects", projectCtrl.myProjectsIndex);
router.get("/index", projectCtrl.allProjects);
router.get(
  "/filteredProject/:filter1/:filter2/:showInactive",
  projectCtrl.projectFilters
);
router.put("/update/:projectid", projectCtrl.update);
module.exports = router;
