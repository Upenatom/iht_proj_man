const express = require("express");
const router = express.Router();
const todosCtrl = require("../../controllers/api/todos");

router.get("/index/:taskid", todosCtrl.index);
router.post("/create/:taskid", todosCtrl.create);
router.put("/update/:taskid/:todoid", todosCtrl.update);
router.delete("/delete/:taskid/:todoid", todosCtrl.delete);

module.exports = router;
