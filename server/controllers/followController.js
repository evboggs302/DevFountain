module.exports = {
  getWhoIamFollowing: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params; //Param is the id of the user who is logged in
    db.getWhoImFollowing(id)
      .then(people => {
        if (!people.length) {
          db.createFollowing([id, []]).then(whoImFollowing => {
            res.status(200).send(whoImFollowing[0].followed);
          });
        } else {
          res.status(200).send(people[0].followed);
        }
      })
      .catch(err => console.log("Error getting all your followers", err));
  },
  updateFollowing: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { newFollowing } = req.body;
    db.getWhoImFollowing(id)
      .then(following => {
        if (!following.length) {
          db.createFollowing([id, newFollowing]).then(whoImFollowing => {
            res.status(200).send(whoImFollowing[0].followed);
          });
        } else {
          db.updateFollowing([id, newFollowing]).then(whoImFollowing => {
            res.status(200).send(whoImFollowing[0].followed);
          });
        }
      })
      .catch(err => console.log(err));
  },

  // This endpoint gets all the posts of the user that you follow
  followingPosts: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.whoIamFollowingPosts(id)
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => console.log("Error getting people who you follow posts"));
  }
};
