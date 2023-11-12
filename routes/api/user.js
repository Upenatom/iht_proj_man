const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/user");

//update user
router.put("/update/:id", usersCtrl.update);
router.put("/pass/update", usersCtrl.updatePass);

module.exports = router;
