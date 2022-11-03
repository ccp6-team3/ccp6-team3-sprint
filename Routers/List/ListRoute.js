const express = require("express");
const router = express.Router();
const list_ctrl = require("../../Controllers/List/ListController");

router.get("/all", list_ctrl.getAllLists);
router.get("/:userid", list_ctrl.getUserLists);
router.post("/", list_ctrl.postList);
// router.delete("/:userid"); // DELETE/user/1
module.exports = router;
