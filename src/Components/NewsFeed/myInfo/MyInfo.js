import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./myinfo.scss";

function MyInfo(props) {
  const { user, following } = props.user;

  function editProfile(email) {
    return <Redirect to={`/profile/${email}`} />;
  }

  if (user && following != null) {
    const { email } = props.user.user;
    var encode = encodeURIComponent(email);
    return (
      <div className="myinfo-newsfeed">
        <img src={user.profile_pic} />
        <h1>
          {user.first} {user.last}
        </h1>
        <h2>Following {following.length} Developers</h2>
        {/* <button onClick={() => editProfile(encode)}>Edit Your Profile</button> */}
      </div>
    );
  }
  return <h1>NewsFeed is loading</h1>;
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const myConnect = connect(mapPropsToState);

export default myConnect(MyInfo);
