const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");

//POST /api/users/signup
router.post("/signup", usersCtrl.create);
//POST /api/users/login
router.post("/login", usersCtrl.login);
router.get("/findBy/:department", usersCtrl.getUsersByDepartment);
router.get("/index", usersCtrl.index);

module.exports = router;
