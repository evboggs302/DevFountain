module.exports = {
  // gets a list of all of the skills to choose from
  getAllSkills: (req, res, next) => {
    const db = req.app.get("db");
    // getGuudNerd simply calls the select all from skills
    db.getGuudNerd()
      .then(allSkills => {
        res.status(200).send(allSkills);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry try again later.");
      });
  },
  // gets an email as a parameter
  getMySkills: (req, res, next) => {
    const { email } = req.params;
    const db = req.app.get("db");
    // email is passed to getSkills pt1 which finds a user.
    db.getSkills(email).then(user => {
      // we take the user_id off of the response and then find the matching id pairs
      db.getSkillstwo(user[0].user_id)
        .then(skills => {
          res.status(200).send(skills);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("Whoops we had an issue");
        });
    });
  },

  addSkills: (req, res, next) => {
    // we take a skill id as a parameter
    const { id } = req.params;
    // user id comes off the session.user object
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    // we check for duplicate key pairs
    db.checkForSkillDupes([id, user_id]).then(checkedSkills => {
      if (checkedSkills[0]) {
        // error handling
        res.status(500).send("No double likes");
        return console.log("no dupes");
      } else {
        // if no duplicate then we add the new pair
        db.addSkills([id, user_id])
          .then(skills => {
            res.status(200).send(skills);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Sorry try again later.");
          });
      }
    });
  },

  removeSkills: (req, res, next) => {
    // skill id as a parameter
    const { id } = req.params;
    // user id off the
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    db.deleteSkill([id, user_id])
      .then(skills => {
        res.status(200).send(skills);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry something went wrong.");
      });
  }
};
