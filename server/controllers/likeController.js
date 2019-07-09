module.exports = {
  getLikes: (req, res, next) => {
    // take the post id to find all the likes on that post.
    const { id } = req.params;
    const db = req.app.get("db");
    //postLikes get all the likes on that post, each like being an id pair of user and post id's
    db.getPostLikes(id)
      .then(likes => {
        res.status(200).send(likes);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry an error happened.");
      });
  },

  like: (req, res, next) => {
    // user_id comes off of the session
    const { user_id } = req.session.user;
    // id is the post id and comes off the req.params
    const { id } = req.params;
    const db = req.app.get("db");
    // we check to see if the post has already been liked by you. This function should never be accessable in the front end if this case
    // is true but I have handled it on the backend just in case.
    db.check_for_double_likes([id, user_id]).then(likeFound => {
      if (likeFound[0]) {
        res.status(500).send("no double likes");
        return console.log("no dupes");
      } else {
        // if no duplicate pairs are found then we allow the like to be placed into the database
        db.addLikes([id, user_id])
          .then(likes => {
            res.status(200).send(likes);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Sorry we had an error");
          });
      }
    });
  },

  unlike: (req, res, next) => {
    // user id comes off the user object in the session again
    const { user_id } = req.session.user;
    // the id comes off req.params. This is still the post_id
    // if the match is found then we allow the delete
    const { id } = req.params;
    const db = req.app.get("db");
    db.removeLike([id, user_id])
      .then(likes => {
        res.status(200).send(likes);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Whoops!");
      });
  }
};
