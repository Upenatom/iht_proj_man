const express = require("express");
const router = express.Router();
const projectCtrl = require("../../controllers/api/projects");

router.post("/", projectCtrl.create);

module.exports = router;
