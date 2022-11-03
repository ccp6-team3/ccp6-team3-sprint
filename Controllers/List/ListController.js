require("dotenv").config();
const knex = require("../../db/knex");
const ListController = {
  getAllLists: async (req, res) => {
    try {
      const data = await knex
        .select({
          listid: "id",
          listName: "list_name",
          listOwner: "list_owner",
        })
        .from("lists");
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
  getUserLists: async (req, res) => {
    try {
      const { userid } = req.params;
      console.log(userid);
      const data = await knex
        .select({
          listId: "id",
          listName: "list_name",
        })
        .from("lists")
        .where("lists.list_owner", "=", userid);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
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
  postList: async (req, res) => {
    try {
      const { listName, userid } = req.body;
      console.log(listName, userid);
      const newList = {
        list_name: listName,
        list_owner: userid,
      };
      const data = await knex("lists").returning(["id"]).insert(newList);
      console.log(data);
      res.status(200).json(data[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Error" });
    }
  },
};
module.exports = ListController;
