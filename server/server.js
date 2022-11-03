require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const timeout = require("connect-timeout");
const userRoutes = require("./Routers/UserRoute/UserRoute");

app.use(cors());
app.use(express.json());
app.use(timeout("5s"));

app.use((req, res, next) => {
  if (!req.timeout) next();
});

app.use("/user", userRoutes);
app.use("/list", userRoutes);
app.use("/item", userRoutes);

const {
  getAllLists,
  getAllItemsFromList,
  getUserData,
  getAllUsersInList,
  getAllListsOnUser,
} = require("./handler/knex.get");

const {
  addList,
  addUser,
  addItemsToList,
  addUserTolist,
} = require("./handler/knex.post");

const {
  deleteUser,
  deleteList,
  deleteItemInList,
  deleteUserFromList,
} = require("./handler/knex.delete");

const { updateItemState } = require("./handler/knex.put");

//GET METHOD

//app.get tests
app.get("/api", async (req, res) => {
  console.log("Hello World");
  await res.send("Hello World");
});

//user data
app.get("/api/user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  await getUserData(userId).then((data) => {
    // console.log(data);
    res.send(data);
  });
});

//all lists data
app.get("/api/lists", async (req, res) => {
  await getAllLists().then((data) => {
    // console.log(data);
    res.send(data);
  });
});

//all items in list
app.get("/api/items/:listId", async (req, res) => {
  const listId = Number(req.params.listId);
  await getAllItemsFromList(listId).then((data) => {
    res.send(data);
  });
});

//all users in list
app.get("/api/users-in-list/:listId", async (req, res) => {
  const listId = Number(req.params.listId);
  await getAllUsersInList(listId).then((data) => {
    // console.log(data);
    res.send(data);
  });
});

//all lists user have (listId)
app.get("/api/lists-on-user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  await getAllListsOnUser(userId).then((data) => {
    // console.log(data);
    res.send(data);
  });
});

//POST METHOD

//add user
app.post("/api/user", async (req, res) => {
  await addUser(req.body);
  res.send(JSON.stringify(req.body));
});

//create list
app.post("/api/lists/add", async (req, res) => {
  // console.log(req.body);
  await addList(req.body);
  res.send(JSON.stringify(req.body));
});

//add items to list
app.post("/api/list/:listId/addItem", async (req, res) => {
  const listId = Number(req.params.listId);
  console.log(listId);
  await addItemsToList(req.body, listId);
  res.send(JSON.stringify(req.body));
});

//add user to list
app.post("/api/list/add-user", async (req, res) => {
  await addUserTolist(req.body);

  res.send(JSON.stringify(req.body));
});

//UPDATE METHOD

//update item state
app.put("/api/list/:listId/toggle", async (req, res) => {
  const listId = Number(req.params.listId);
  await updateItemState(req.body, listId);

  res.send(JSON.stringify(req.body));
});

//DELETE METHOD

//delete a user
app.delete("/api/users/:userId/delete", async (req, res) => {
  await deleteUser(userId);
  res.send(JSON.stringify(req.body));
});

// delete a list
app.delete("/api/lists/:listId/delete", async (req, res) => {
  const listId = Number(req.params.listId);
  await deleteList(listId);
  res.send(JSON.stringify(req.body));
});

//delete an item
app.delete("/api/lists/:listId/delete", async (req, res) => {
  const listId = Number(req.params.listId);
  await deleteItemInList(listId, req.body);
  res.send(JSON.stringify(req.body));
});

app.delete("api/lists/:userId/:listId/delete", async (req, res) => {
  const userId = Number(req.params.userId);
  const listId = Number(req.params.listId);
  await deleteUserFromList(userId, listId);
  res.send(JSON.stringify(req.body));
});

// app.post("api/access", async (req, res) => {
//   const dbCode = await checkCode(req.body)
//   if (dbCode === req.body.code) {
//     res.send({ granted: true })
//   }
// })

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
