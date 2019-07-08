const express = require("express");
const app = express();
const massive = require("massive");
require("dotenv").config();
app.use(express.json());
const session = require("express-session");
const nodemailer = require("nodemailer");
const { login, register, userInfo, logout } = require("./controllers/");
const { SERVER_PORT, EMAIL, EMAIL_PASSWORD } = process.env;

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

// auth EndPoints
app.post("/api/login", login);
app.post("/api/register", register);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// Nodemailer
app.post('/api/send', (req, res, next) => {
  const {name, email, title, message} = req.body
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from:`${EMAIL}`,
    to: `${email}`,
    subject: `${title} by ${name}`,
    text: `${message}`,
    replyTo: ``
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if(err){
      console.error('there was an error ', err)
    } else{
      console.log('here is the email', res)
    }
  })
})

const port = SERVER_PORT || 4000;
console.log(port);
app.listen(port, () => console.log(`Listening on port ${port}`));
