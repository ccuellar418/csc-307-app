import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
// import userService from 'packages\\express-backend\\services\\user-service.js';
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  // .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let query;
  if (name != undefined && job === undefined) {
    query = userService.findUserByName(name);
    // result = { users_list: result };
    // res.send(result);
  } 
  else if (job != undefined && name === undefined) {
    query = userService.findUserByJob(job);
    // result = { users_list: result };
    // res.send(result);
  }
  else if (job != undefined && name != undefined) {
    query = userService.findUserByNameAndJob(name, job);
  }
  else {
    query = userService.getUsers();
    // res.send(users);
  }
  query.then(users => res.send({ users_list: users }))
  .catch(err => res.status(500).send(err.message));
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  // let result = userService.findUserById(id);
  userService.findUserById(id)
  .then(result => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  // .catch((err) => console.error("Error getting user by ID:", err))
  .catch (res.status(500).send());

});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  // const addedUser = userService.addUser(userToAdd);
  userService.addUser(userToAdd)
  // .then(saved => res.status(201).send(saved))
  // .catch(res.status(400).send())
  .then(savedUser => res.status(201).send(savedUser))
  // .catch((err) => console.error("Error adding user to list:", err))
  .catch(err => res.status(400).send(err.message))
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  // let user = userService.findUserById(id);
  userService.delUser(id)
  .then(deleteUser => {
    if (deleteUser === undefined) 
      return res.status(404).send();
  else
    return res.status(204).send();
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send(err.message)
})});
  // if (user === undefined) {
  //   res.status(404).send("Resource not found.");
  // } else {
  //   res.status(204).send();
  // }
// });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});