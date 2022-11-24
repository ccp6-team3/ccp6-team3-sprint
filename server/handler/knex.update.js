const knex = require("../../db/knex");

module.exports = {
    
    updateItemInList(listId,itemName,purchasedSelected) {
        return knex("items_in_list").update({
			purchased: purchasedSelected
		})
            .where("list_id", "=", listId)
            .where("item_name", "=", itemName)
            .then(() => console.log('item updated'))
    }
}
