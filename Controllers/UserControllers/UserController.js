require("dotenv").config();
const knex = require("../../../db/knex");
const UserController = {
  getUserData: async (req, res) => {
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
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
};
module.exports = UserController;
