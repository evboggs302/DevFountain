const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    db.check_existing_users(email).then(found => {
      if (!found[0]) {
        res.status(200).send("Incorrect username/password");
      } else {
        bcrypt.compare(password, found[0].password).then(matched => {
          if (matched) {
            const {
              user_id,
              email,
              first,
              last,
              skills,
              title,
              developer,
              linkedin,
              portfolio,
              profile_pic,
              following
            } = found[0];
            req.session.user = {
              user_id,
              email,
              first,
              last,
              skills,
              title,
              developer,
              linkedin,
              portfolio,
              profile_pic,
              following
            };
            
            res.status(200).send(req.session.user);
          } else {
            res.status(200).send("Incorrect username/password");
          }
        });
      }
    });
  },
  register: (req, res, next) => {
    //default profile pic for users when they sign up

    const { first, last, developer, email, password, default_pic } = req.body;
    const db = req.app.get("db");
    db.check_existing_users(email).then(found => {
      if (found.length) {
        res.status(500).send("Email already exists!");
      } else {
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.register([
              first,
              last,
              developer,
              email,
              hashedPassword,
              default_pic
            ]).then(createdUser => {
              (req.session.user = createdUser[0]),
                res.status(200).send(req.session.user);
            });
          });
        });
      }
    });
  },
  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  othersInfo: (req, res, next) => {
    const db = req.app.get("db");
    const { email } = req.params;
    db.getOthersInfo(email)
      .then(foundOther => {
        res.status(200).send(foundOther[0]);
      })
      .catch(err => console.log(err));
  },

  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("we be logged out, mama!");
  },
  edit: (req, res, next) => {
    const db = req.app.get("db");
    //need user id from front end off of user object
    const { id } = req.params;
    //grab all malleable data from req.body
    console.log("body: ", req.body);
    const { first, last, title, linkedin, portfolio } = req.body;
    //find the proper user to edit
    db.selectUserByID(id).then(foundUser => {
      console.log("FoundUser: ", foundUser);
      if (foundUser.length) {
        //values will equal the old if no new value is passed
        let newFirst = first || foundUser[0].first;
        let newLast = last || foundUser[0].last;
        let newTitle = title || foundUser[0].title;
        let newLinkedin = linkedin || foundUser[0].linkedin;
        let newPortfolio = portfolio || foundUser[0].portfolio;
        let profile_pic = foundUser[0].profile_pic;
        let email = foundUser[0].email;
        //pass the new values in to replace old
        db.changeUserInfo([
          newFirst,
          newLast,
          newTitle,
          newLinkedin,
          newPortfolio,
          profile_pic,
          email,
          id
        ])
          .then(updatedUser => {
            //New user object is returned
            console.log("UpdatedUser:", updatedUser);
            req.session.user = updatedUser[0];
            res.status(200).send(req.session.user);
          })
          .catch(err => {
            //error handling if failed
            console.log("err:", err);
            res.status(500).send("Change failed.");
          });
      }
    });
  },
  //updating the user's profile picture
  updateProfilePic: (req, res, next) => {
    const { id } = req.params;
    const { profile_pic } = req.body;
    const db = req.app.get("db");
    db.updateProfilePic([id, profile_pic])
      .then(newProfilePic => {
        res.status(200).send(newProfilePic[0]);
      })
      .catch(err => {
        console.log("pic did not update", err);
        res.status(500).send("Error with not updating picture");
      });
  },

  // takes an info object, a socket, and a database param
  joinRoom(info, socket, db) {
    // we join the socket named after the concat of the user emails, with the first name in alphabetical order first
    socket.join(info.roomName);
    // we use the email of the recipient to find the recipient's id
    db.getId(info.email2).then(rId => {
      // we take the sender's id off the info object, the user_id off the recipient db call response,
      // and then emit the messages on the socket
      db.getMessages(info.user_id, rId.user_id).then(messages => {
        socket.emit("messages", messages);
      });
    });
  }
};
