const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserController");

router.get("/:userid", user_ctrl.getUserById); // GET/user/1
router.get("/list/:listid", user_ctrl.getUsersInList); // GET/user/:list
router.post("/", user_ctrl.signup); // POST/user/{body}
// router.delete("/:userid"); // DELETE/user/1
module.exports = router;
