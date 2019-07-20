module.exports = {
  getMyMessages: (req, res, next) => {
    const db = req.app.get("db");
    // userid off of the session
    const { user_id } = req.session.user;
    const { email } = req.params;
    db.getUserId(email).then(id => {
      db.getYourMessages(user_id, id[0].user_id)
        .then(messages => {
          res.status(200).send(messages);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("Sorry something went wrong");
        });
    });
    // your userid is used to find all messages where you are the sender or reciever
    // all sql files return these messages
  },

  sendMessage: (req, res, next) => {
    const db = req.app.get("db");
    // userid comes off the session
    const { user_id } = req.session.user;
    // content comes from the body
    const { content } = req.body;
    // the email of the recipient comes as a parameter
    const { email } = req.params;
    // the email is passed in to find their user_id
    db.getUserId(email)
      .then(recipient => {
        // the content, a new data object, the sender's id, and the recipients userid
        // are passed in to be inserted into the table as a new row and then all
        // of the messages where the sender's id is either a recipient or a sender are returned
        console.log(req.body);
        db.postMessage([
          content,
          new Date(),
          user_id,
          recipient[0].user_id
        ]).then(messages => {
          res.status(200).send(messages);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry something went wrong");
      });
  },

  deleteMessage: (req, res, next) => {
    const db = req.app.get("db");
    // user id comes off of the session
    const { user_id } = req.session.user;
    const { id } = req.params;
    // user_id is passed in to delete all the messages where you are a sender

    db.removeMessage([user_id, id])
      .then(messages => {
        console.log(req.params);
        res.status(200).send(messages);
      })
      .catch(err => {
        console.log(err, req.params);
        res.status(500).send("Something went wrong");
      });
  },

  getMyRooms: (req, res, next) => {
    const db = req.app.get("db");
    const { email } = req.session.user;
    db.getRooms(email)
      .then(rooms => {
        res.status(200).send(rooms);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something has gone horribly wrong");
      });
  },

  createRoom: (req, res, next) => {
    const db = req.app.get("db");
    const { email } = req.session.user;
    const { email2 } = req.params;
    let arr = [email, email2];
    let sort = arr.sort();
    let join = sort.join("");
    db.checkIfRoom(join).then(roomFound => {
      if (!roomFound.length) {
        console.log(email, email2, join);
        db.createRoom(email, email2, join)
          .then(rooms => {
            res.status(200).send(rooms);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
          });
      } else {
        res.status(500).send("message");
      }
    });
  }
};
