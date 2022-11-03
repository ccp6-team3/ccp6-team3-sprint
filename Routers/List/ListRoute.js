const express = require("express");
const router = express.Router();
const list_ctrl = require("../../Controllers/List/ListController");

router.get("/all", list_ctrl.getAllLists);
router.get("/:userid", list_ctrl.getUserLists);
router.get("/:listid/items", list_ctrl.getItemsByListId);
router.post("/", list_ctrl.postList);
router.post("/item", list_ctrl.postItem);
router.post("/user", list_ctrl.postUser);
router.delete("/:listid", list_ctrl.deleteList);
router.delete("/:listid/item/:itemName", list_ctrl.deleteItemFromList);
router.delete("/:listid/user/:userid", list_ctrl.deleteUserFromList);
module.exports = router;
