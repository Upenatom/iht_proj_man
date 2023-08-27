const express = require("express");
const router = express.Router();
const projectCtrl = require("../../controllers/projects");

router.post("/", projectCtrl.create);

module.exports = router;
