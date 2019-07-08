const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    db.check_existing_users(email).then(found => {
      if (!found[0]) {
        res.status(500).send("Incorrect username/password");
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
            res.status(500).send("Incorrect username/password");
          }
        });
      }
    });
  },
  register: (req, res, next) => {
    const { first, last, developer, email, password } = req.body;
    const db = req.app.get("db");
    db.check_existing_users(email).then(found => {
      if (found.length) {
        res.status(500).send("Email already exists!");
      } else {
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.register([first, last, developer, email, hashedPassword]).then(
              createdUser => {
                (req.session.user = createdUser[0]),
                  res.status(200).send(req.session.user);
              }
            );
          });
        });
      }
    });
  },
  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("we be logged out, mama!");
  },
  edit: (req, res, next) => {
    //need user id from front end off of user object
    const { id } = req.params;
    //grab all malleable data from req.body
    const { first, last, title, linkedin, portfolio, profile_pic } = req.body;
    //console log for data track
    console.log(first, last, title, linkedin, portfolio, profile_pic);
    //find the proper user to edit
    db.selectUserById(id).then(foundUser => {
      console.log("FoundUser:", foundUser);
      if (foundUser.length) {
        //values will equal the old if no new value is passed
        let newFirst = first || foundUser[0].first;
        let newLast = last || foundUser[0].last;
        let newTitle = title || foundUser[0].title;
        let newLinkedin = linkedin || foundUser[0].linkedin;
        let newPortfolio = portfolio || foundUser[0].portfolio;
        let newProfile_pic = profile_pic || foundUser[0].profile_pic;
        //pass the new values in to replace old
        db.changeUserInfo([
          newFirst,
          newLast,
          newTitle,
          newLinkedin,
          newPortfolio,
          newProfile_pic,
          id
        ])
          .then(updatedUser => {
            //New user object is returned
            req.session.user = updatedUser;
            console.log("UpdatedUser:", updatedUser);
            req.session.user = updatedUser;
            res.status(200).send(req.session.user);
          })
          .catch(err => {
            //error handling if failed
            console.log("err:", err);
            res.status(500).send("Change failed.");
          });
      }
    });
  }
};
