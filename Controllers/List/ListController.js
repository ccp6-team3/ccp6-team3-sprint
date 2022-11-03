require("dotenv").config();
const knex = require("../../db/knex");
const ListController = {
  getAllList: async (req, res) => {
    try {
      const data = await knex.select("*").from("lists");
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
};
module.exports = ListController;
