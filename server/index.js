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

const {
  getPosts,
  createPost,
  changePost,
  removePost
} = require("./controllers/postController");

const { getLikes, like, unlike } = require("./controllers/likeController");

const {
  getAllSkills,
  getMySkills,
  newSkills
} = require("./controllers/skillsController");

const {
  getMyMessages,
  sendMessage,
  deleteMessage
} = require("./controllers/messageController");

const { allUsers } = require("./controllers/marketplaceController");

const {
  SERVER_PORT,
  EMAIL,
  EMAIL_PASSWORD,
  SESSION_SECRET,
  CONNECTION_STRING
} = process.env;

app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1209600000 // 2week cookie
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

// skills endpoints
// Gets a list of all skills and associated values
app.get("/api/allskills", getAllSkills);
// takes an email as a param and finds the associated userId to allow us to get all of that user's skills
// returns the skill id's and the user's id
app.get("/api/skills/:email", getMySkills);
// takes a skill id as a param and the user's id off their session to add a skill
app.put("/api/skills/", newSkills);

// post endpoints
//gets all of a user's posts with their email
app.get("/api/post/:email", getPosts);
// creates a post
app.post("/api/post", createPost);
//allows editing of a post with a user id and post id. Post id is a param
app.put("/api/post/:id", changePost);
// delets a post with the same id's as the put endpoint
app.delete("/api/post/:uid/:id", removePost);

// likes endpoints
// takes a post id as a param and gets all the likes on that post
app.get("/api/likes/:id", getLikes);
// takes a post id as a param and a user_id off the session and sends those to the table
app.post("/api/likes/:id", like);
// takes a post_id as a param again and the user_id off the session to remove the like
app.delete("/api/likes/:id", unlike);

// Marketplace Endpoints
app.get("/api/marketplace", allUsers);

//message endpoints
app.get("/api/messages", getMyMessages);
app.post("/api/messages/:email", sendMessage);
app.delete("api/messages/:id", deleteMessage);

// Following Endpoints
const {getWhoIamFollowing, follow, followingPosts} = require('./controllers/followController')
app.get('/api/following/:id', getWhoIamFollowing )
app.post('/api/follow', follow)
app.get('/api/following-posts/:id', followingPosts )


// Nodemailer
app.post("/api/send", (req, res, next) => {
  const { name, email, title, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `${EMAIL}`,
    to: `${email}`,
    subject: `${title} by ${name}`,
    text: `${message}`,
    replyTo: ``
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error("there was an error ", err);
    } else {
      console.log("here is the email", res);
    }
  });
});

// create sockets for messaging

// Becasue of browser router, we will eventually need the below lines.
// app.use(express.static(__dirname + "/../build"));
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

const port = SERVER_PORT || 4000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}`));
