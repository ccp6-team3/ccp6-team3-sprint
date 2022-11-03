const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/UserControllers/UserController");

router.get("/:userid", user_ctrl.getUserData); // GET/user/1
// router.get("/:list"); // GET/user/:list
// router.post("/"); // POST/user/{body}
// router.delete("/:userid"); // DELETE/user/1
module.exports = router;
