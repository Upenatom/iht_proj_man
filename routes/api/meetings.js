const express = require("express");
const router = express.Router();
const meetingsCtrl = require("../../controllers/api/meetings");

router.post("/:projectid/create", meetingsCtrl.create);
router.get("/:projectid/", meetingsCtrl.index);
router.put("/update/:projectid/:meetingid", meetingsCtrl.update);
router.delete("/delete/:projectid/:meetingid", meetingsCtrl.delete);
module.exports = router;
