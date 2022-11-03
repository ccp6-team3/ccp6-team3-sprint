require("dotenv").config();
const knex = require("../../db/knex");
const UserController = {
  getItemsByListId: async (req, res) => {
    try {
      const { listid } = req.params;
      console.log(listid);
      const data = await knex
        .select({
          itemName: "item_name",
          quantity: "quantity",
          purchased: "purchased",
        })
        .from("items_in_list")
        .where("items_in_list.list_id", "=", listid);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
};
module.exports = UserController;
