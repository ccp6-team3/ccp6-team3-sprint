const express = require("express");
const router = express.Router();
const item_ctrl = require("../../Controllers/Item/ItemController");

router.get("/:listid", item_ctrl.getItemsByListId); // GET/user/1
// router.get("/:list"); // GET/user/:list
// router.post("/"); // POST/user/{body}
// router.delete("/:userid"); // DELETE/user/1
module.exports = router;
