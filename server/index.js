const express = require("express");
const app = express();
const massive = require("massive");
require("dotenv").config();
app.use(express.json());
const session = require("express-session");
const nodemailer = require("nodemailer");
const {
  login,
  register,
  userInfo,
  logout,
  edit
} = require("./controllers/userController");
const { SERVER_PORT } = process.env;

app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // 2week cookie
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

// user EndPoints
app.post("/api/login", login);
app.post("/api/register", register);
app.put("/api/edit", edit);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// Becasue of browser router, we will eventually need the below lines.
// app.use(express.static(__dirname + "/../build"));
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

const port = SERVER_PORT || 4000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}`));
