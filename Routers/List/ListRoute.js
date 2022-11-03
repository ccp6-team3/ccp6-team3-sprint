const express = require("express");
const router = express.Router();
const list_ctrl = require("../../Controllers/List/ListController");

router.get("/all", list_ctrl.getAllList); // GET/user/1
// router.get("/:list"); // GET/user/:list
// router.post("/"); // POST/user/{body}
// router.delete("/:userid"); // DELETE/user/1
module.exports = router;
