module.exports = {
  getPosts: (req, res, next) => {
    // pass a user id to get all of that user's posts
    const { email } = req.params;
    const db = req.app.get("db");
    db.getallpostsone(email)
      .then(posts => {
        db.getallpoststwo(posts[0].user_id).then(morePosts => {
          res.status(200).send(morePosts);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("We had a problem getting posts. Try later.");
      });
  },

  createPost: (req, res, next) => {
    const { content } = req.body;
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    db.makePost([content, new Date(), user_id])
      .then(newPosts => {
        res.status(200).send(newPosts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Server error oops!");
      });
  },

  changePost: (req, res, next) => {
    const { post_id } = req.params;
    const { user_id } = req.session.user;
    const { content } = req.body;
    const db = req.app.get("db");
    db.editPost([content, post_id, user_id])
      .then(updatedPosts => {
        res.status(200).send(updatedPosts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry, try later.");
      });
  },
  removePost: (req, res, next) => {
    const { user_id } = req.sesstion.user;
    const {} = req.body;
    console.log(user_id);
    const db = req.app.get("db");
    db.deletePost(user_id)
      .then(remainingPosts => {
        res.status(200).send(remainingPosts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry an error happened.");
      });
  }
};
