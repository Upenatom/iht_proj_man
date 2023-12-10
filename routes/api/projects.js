const express = require("express");
const router = express.Router();
const projectCtrl = require("../../controllers/api/projects");

router.post("/create", projectCtrl.create);
router.get(
  "/myProjects/:filter1/:filter2/:display",
  projectCtrl.myProjectsIndex
);
router.get("/index", projectCtrl.allProjects);
router.get(
  "/filteredProject/:filter1/:filter2/:display",
  projectCtrl.projectFilters
);
router.put("/update/:projectid", projectCtrl.update);
module.exports = router;
