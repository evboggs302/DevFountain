module.exports = {
  // get takes a function connect, a next, and the database connection
  get: function(connect, next, db) {
    // get the sessionId from the data passed into the cookie
    var sessionId = connect.signedCookies["express.sid"];
    // if the database has a connection then we will run our querry to the session table
    if (db) {
      // we try to find the stored session from the sessionId
      db.querry('select * from "session" where sid = $1', sessionId).then(
        session => {
          // if we get a response where session is true, then we set the response equal to the session property
          if (session) {
            connect.session = session[0];
            console.log(session[0]);
            next();
          } else {
            next();
          }
        }
      );
    }
  }
};
