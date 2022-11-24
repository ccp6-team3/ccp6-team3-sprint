const knex = require("../../db/knex");

module.exports = {
    deleteList(listId) {
        return knex("lists")
            .where("id", "=", listId)
            .del()
            .then(() => console.log('list deleted'))
    },

    deleteItemInList(listId,itemName) {
        return knex("items_in_list")
            .where("list_id", "=", listId)
            .where("item_name", "=", itemName)
            .del()
            .then(() => console.log('item deleted'))
    },

    deleteUser(userId) {
        return knex("users")
            .where("user_id", "=", userId)
            .del()
            .then(() => console.log('user deleted'))
    },

    deleteUserFromList(data) {
        return knex("users_in_list")
            .where("list_id", "=", data.listId)
            .where("user_id", "=", data.userId)
            .del()
            .then(() => console.log('user deleted from list'))
    }
}
