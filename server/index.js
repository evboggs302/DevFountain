const express = require("express");
const app = express();
const massive = require("massive");
require("dotenv").config();
app.use(express.json());
const session = require("express-session");
const { login, register, userInfo, logout } = require("./controller/");

const { SERVER_PORT } = process.env;

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

// auth EndPoints
app.post("/api/login", login);
app.post("/api/register", register);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

const port = SERVER_PORT || 4000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}`));
