module.exports = {
  getPosts: (req, res, next) => {
    // pass an email to get all of that user's posts
    const { email } = req.params;
    const db = req.app.get("db");
    // post one takes an email address to get a user and then passes that user_id into post two
    db.getallpostsone(email)
      .then(user => {
        // post two takes in a user_id and gets their posts.
        db.getallpoststwo(user[0].user_id).then(morePosts => {
          res.status(200).send(morePosts);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("We had a problem getting posts. Try later.");
      });
  },

  createPost: (req, res, next) => {
    // the content of the message comes from the req.body.
    console.log(req.body)
    const { content} = req.body;
    console.log(content)
    let postDate = new Date().toDateString();
    
    // the user_id comes off the req.session.user
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    // a new date is created with the date constructor
    db.makePost([content, postDate, user_id])
      .then(newPosts => {
        res.status(200).send(newPosts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Server error oops!");
      });
  },

  changePost: (req, res, next) => {
    // the post_id comes off the params
    const { id } = req.params;
    // user_id comes off the user object on session
    const { user_id } = req.session.user;
    // content comes off the req.body
    const { content } = req.body;
    const db = req.app.get("db");
    db.editPost([content, id, user_id])
      .then(updatedPosts => {
        res.status(200).send(updatedPosts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry, try later.");
      });
  },

  removePost: (req, res, next) => {
    // you know the drill
    const { user_id } = req.session.user;
    // id is still the post_id
    const { id } = req.params;
    console.log(user_id, id);
    const {} = req.body;
    const db = req.app.get("db");
    // delete post will also delete all the likes off of that post
    db.deletePost([user_id, id])
      .then(remainingPosts => {
        res.status(200).send(remainingPosts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Sorry an error happened.");
      });
  }
};
