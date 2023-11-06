const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/user");

//update user
router.put("/update/:id", usersCtrl.update);

module.exports = router;
