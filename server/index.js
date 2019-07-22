const express = require("express");
const app = express();
const path = require("path");
// is there a required install for this?
const server = require("http").createServer(app);
const sessionService = require("./sessionService");
const session = require("express-session");
const io = require("socket.io")(server);
// pgSession handles connecting to the db to the session table
var pgSession = require("connect-pg-simple")(session);
// handles the cookie data
const cookieParser = require("cookie-parser");
const massive = require("massive");
require("dotenv").config();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));
console.log("===", path.join(__dirname, "../build"));

const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary");

const {
  login,
  register,
  userInfo,
  logout,
  othersInfo,
  edit,
  updateProfilePic,
  joinRoom
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
  newSkills,
  theirSkills
} = require("./controllers/skillsController");

const {
  getMyMessages,
  sendMessage,
  deleteMessage,
  getMyRooms,
  createRoom
} = require("./controllers/messageController");

const { allUsers } = require("./controllers/marketplaceController");

const {
  SERVER_PORT,
  EMAIL,
  EMAIL_PASSWORD,
  SESSION_SECRET,
  CONNECTION_STRING,
  CLOUDINARY_SECRET_API
} = process.env;

app.use(
  session({
    store: new pgSession({
      conString: CONNECTION_STRING
    }),
    saveUninitialized: true,
    secret: "piueyrwtiuovxmznskjdhfalkjs",
    resave: true,
    key: "express.sid",
    cookie: {
      maxAge: 1209600000 // 2week cookie
    }
  })
);

// not sure of the difference
let db;
massive(CONNECTION_STRING).then(databaseInstance => {
  db = databaseInstance;
  app.set("db", db);
  console.log("db is connected");
});

io.use(function(socket, next) {
  const parseCookie = cookieParser("piueyrwtiuovxmznskjdhfalkjs");
  // console.log(parseCookie());
  let handshake = socket.request;
  parseCookie(handshake, null, function(err, data) {
    sessionService.get(handshake, next, db);
  });
});

// app.get("/", (req, res) => {
//   if (req.query.name) {
//     req.session.user = req.query.name;
//     res.send(req.session);
//   } else {
//     res.send("send a name query");
//   }
// });

io.sockets.on("connection", socket => {
  console.log("connection hit");
  let joined = true;
  socket.on("room", roomName => {
    if (joined) {
      joinRoom(roomName, socket);
      joined = false;
      console.log("roomname should be here ===>", roomName);
    }
  });
  socket.on("message", userMessage => {
    const { send_email, rec_email, message, user_id, roomName } = userMessage;
    console.log("usermessage", userMessage, roomName);
    // save new message to db
    db.getUserId(rec_email)
      .then(res => {
        db.postMessage(message, new Date(), user_id, res[0].user_id).then(
          () => {
            console.log("new something i dont know + chill", message);

            io.in(roomName).emit("message", `${message}`);
          }
        );
        console.log("message hit");
      })
      .catch();
  });
});

// user EndPoints
app.post("/api/login", login);
app.post("/api/register", register);
app.put("/api/edit/:id", edit);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);
// other users' info
app.get("/api/others/:email", othersInfo);
//update user profile pic endpoint
app.put("/api/image/:id", updateProfilePic);

// skills endpoints
// Gets a list of all skills and associated values
app.get("/api/allskills", getAllSkills);
// takes an email as a param and finds the associated userId to allow us to get all of that user's skills
// returns the skill id's and the user's id
app.get("/api/skills/:email", getMySkills);
// take an array of skill ID's as a body req
app.put("/api/new_skills", newSkills);
// get other users skills
app.get("/api/their_skills/:email", theirSkills);

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
app.get("/api/messages/:email", getMyMessages);
app.post("/api/messages/:email", sendMessage);
app.delete("api/messages/:id", deleteMessage);
app.get("/api/rooms", getMyRooms);
app.post("/api/rooms/:email2", createRoom);

// Following Endpoints
const {
  getWhoIamFollowing,
  updateFollowing,
  followingPosts
} = require("./controllers/followController");
app.get("/api/following/:id", getWhoIamFollowing);
app.put("/api/following/:id", updateFollowing);
app.get("/api/following-posts/:id", followingPosts);

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

//cloudinary
//this endpoint will pass a signature to the front end that will allow an image to have access to
//the cloudinary account.
app.get("/api/upload", (req, res) => {
  //timestamp in UNIX Format
  const timestamp = Math.round(new Date().getTime() / 1000);
  const api_secret = CLOUDINARY_SECRET_API;
  //built in cloundinary api sign request to create hashed signature w/ api secret and UNIX timestamp
  const signature = cloudinary.utils.api_sign_request(
    { timestamp: timestamp },
    api_secret
  );
  //signature object to send to the front-end
  const payload = {
    signature: signature,
    timestamp: timestamp
  };
  res.json(payload);
});

// create sockets for messaging

// Becasue of browser router, we will eventually need the below lines.
// app.use(express.static(__dirname + "/../build"));
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

console.log(path.join(__dirname, "../build"));

const port = SERVER_PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));
