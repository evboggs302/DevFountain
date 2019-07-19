import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import ViewSkills from "./ViewSkills";
import EditProfile from "./EditProfile";
import OtherPerson from "./OtherPerson";
// import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setUser, setOtherPerson } from "../../dux/reducers/userReducer";
// import axios from "axios";
import {
  FaLinkedin,
  FaEnvelope,
  FaFolderOpen,
  FaUserEdit
} from "react-icons/fa";
import "./Profile.scss";

function Profile(props) {
  // let [className, setClassName] = useState("profile");
  let [hidden, setHidden] = useState(true);

  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }
  const decoded = decodeURIComponent(props.match.params.email);
  const current = props.user.user.email === decoded;

  const {
    developer,
    email,
    first,
    last,
    linkedin,
    portfolio,
    profile_pic,
    title
    // user_id
  } = props.user.user;

  const { myPosts } = props.posts;

  var mappedPosts = [];
  if (myPosts) {
    myPosts.sort((a, b) => {
      return b.post_id - a.post_id;
    });
    mappedPosts = myPosts.map((val, index) => {
      return (
        <div className="post-card" key={index}>
          <div className="post-user-info">
            <div>
              <img src={val.profile_pic} alt="profile pic" />
            </div>
            <div className="user_info">
              <h1>
                {val.first} {val.last}
              </h1>
              <h2>{val.time_entered}</h2>
            </div>
          </div>
          <div className="post-content">
            <p>{val.content}</p>
          </div>
        </div>
      );
    });
  }

  console.log(props);
  return (
    <div>
      <AppHeader {...props} />
      {!current ? null : (
        <div>
          <div className="profile-page-top">
            <div className="photo-div">
              <div>
                <div className="profile-pic">
                  <img
                    style={{ width: "100%", minWidth: "130px" }}
                    src={profile_pic}
                  />
                </div>
                <h1 className="user-name">{`${first} ${last}`}</h1>
              </div>
              <div className="profile-btn-top">
                {current ? (
                  <button className="edit-btn" onClick={() => setHidden(false)}>
                    <FaUserEdit className="edit-icon" />
                    Edit Profile
                  </button>
                ) : (
                  <button>Follow</button>
                )}
              </div>
            </div>
          </div>
          <div className="user-info-box">
            <div className="user-info">
              <h1>{title}</h1>
              <div>
                <FaFolderOpen className="info-icon" />
                <a href={portfolio} target="_blank">
                  Portfolio
                </a>
              </div>
              <div>
                <FaLinkedin className="info-icon" />
                <a href={linkedin} target="_blank">
                  LinkedIn
                </a>
              </div>
              <div>
                <FaEnvelope className="info-icon" />
                {email}
              </div>
            </div>
            {mappedPosts.length ? (
              <div className="feed-container">{mappedPosts}</div>
            ) : (
              <div className="feed-container uhoh">
                Uh-oh! You don't have any posts. Please go to NewsFeed to make
                your first post.
              </div>
            )}
            <div>{developer ? <ViewSkills {...props} /> : null}</div>
          </div>
          {!hidden ? (
            <EditProfile {...props} closeFn={() => setHidden(true)} />
          ) : null}
        </div>
      )}
      {!props.user.otherPerson || current ? null : <OtherPerson {...props} />}
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setOtherPerson
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
