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
};
module.exports = UserController;
