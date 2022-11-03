require("dotenv").config();
const knex = require("../../db/knex");
const UserController = {
  getUserById: async (req, res) => {
    try {
      const { userid } = req.params;
      console.log(userid);
      const data = await knex
        .select({
          userid: "id",
          userName: "user_name",
          userEmail: "user_email",
          userProPic: "user_pro_pic",
          userPassword: "user_password",
        })
        .from("users")
        .where("id", "=", userid);
      console.log(data);
      res.status(200).json(data[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
  getUsersInList: async (req, res) => {
    try {
      const { listid } = req.params;
      console.log(listid);
      const data = await knex
        .select({
          userId: "user_id",
          userName: "user_name",
          userEmail: "user_email",
          userProPic: "user_pro_pic",
        })
        .from("users_in_list")
        .join("users", { "users.id": "users_in_list.user_id" })
        .where("users_in_list.list_id", "=", listid);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
  signup: async (req, res) => {
    try {
      const { userName, userEmail, userProPic, userPassword } = req.body;
      console.log(userName, userEmail, userProPic, userPassword);
      const newUser = {
        user_name: userName,
        user_email: userEmail,
        user_pro_pic: userProPic,
        user_password: userPassword,
      };
      const data = await knex("users").returning(["id"]).insert(newUser);
      console.log(data);
      res.status(200).json(data[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
};
module.exports = UserController;
