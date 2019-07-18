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
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    // email is passed to getSkills pt1 which finds a user.
    db.getSkillstwo(user_id)
      .then(response => {
        if (!response.length) {
          db.addSkills([user_id, []]).then(newSkillSet => {
            res.status(200).send(newSkillSet[0].skills);
          });
        }
        res.status(200).send(response[0].skills);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Whoops we had an issue");
      });
  },

  newSkills: (req, res, next) => {
    // we take an array of skill ID's as a parameter
    const { skillID } = req.body;
    // user id comes off the session.user object
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    db.updateSkills([user_id, skillID])
      .then(newSkills => {
        res.status(200).send(newSkills[0].skills);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("adding skills failed");
      });
  },
  theirSkills: (req, res, next) => {
    const { email } = req.params;
    const db = req.app.get("db");
    db.getSkills(email).then(them => {
      if (!them.length) {
        res.status(500).send([]);
      } else {
        db.getSkillstwo(them[0].user_id).then(theirSkills => {
          res.status(200).send(theirSkills[0].skills);
        });
      }
    });
  }
};
