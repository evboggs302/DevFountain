import React from "react";
// import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setTheirSkills } from "../../dux/reducers/skillsReducer";
import {
  setUser,
  setOtherPerson,
  setFollowing
} from "../../dux/reducers/userReducer";
import { FaLinkedin, FaEnvelope, FaFolderOpen } from "react-icons/fa";
import axios from "axios";
import LoadingAnimation from "../CoolAnimation/LoadingAnimation";

function OtherPerson(props) {
  const decoded = decodeURIComponent(props.match.params.email);

  const messageRoom = () => {
    console.log(decoded);
    axios.post(`/api/rooms/${decoded}`).then(response => {
      props.history.push("/messages");
    });
  };

  const addDev = id => {
    const { user_id } = props.user.user;
    const { following } = props.user;
    let copy = following.slice();
    copy.push(id);
    axios
      .put(`/api/following/${user_id}`, { newFollowing: copy })
      .then(response => {
        props.setFollowing(response.data);
      });
  };

  const removeDev = id => {
    const { user_id } = props.user.user;
    const { following } = props.user;
    let list = following.slice();
    let index = list.indexOf(id);
    list.splice(index, 1);
    axios
      .put(`/api/following/${user_id}`, { newFollowing: list })
      .then(response => {
        props.setFollowing(response.data);
      });
  };

  const {
    developer,
    profile_pic,
    email,
    first,
    last,
    title,
    linkedin,
    portfolio
  } = props.user.otherPerson;

  const { allSkills, theirSkills } = props.skills;
  var theirSkillys = [];
  if (theirSkills) {
    for (let k = 0; k < allSkills.length; k++) {
      for (let i = 0; i < theirSkills.length; i++) {
        if (allSkills[k].skill_id === theirSkills[i]) {
          theirSkillys.push(allSkills[k]);
        }
      }
    }
  }

  const mappedSkills = theirSkillys.map(e => {
    return (
      <div key={e.skill_id}>
        <h2 className="skill-name">{e.skill}</h2>
        <img src={e.icon} alt="skill icon" className="skill-icon" />
      </div>
    );
  });

  const { profilePosts } = props.posts;
  var postsMapped = [];
  if (profilePosts) {
    profilePosts.sort((a, b) => {
      return b.post_id - a.post_id;
    });
    postsMapped = profilePosts.map((val, index) => {
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

  const alreadyFollowing = props.user.following;
  const othersID = props.user.otherPerson.user_id;
  let rightDev = email == decoded;

  if (rightDev) {
    return (
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
          </div>
        </div>
        <div className="other-user">
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
            {!alreadyFollowing.includes(othersID) ? (
              <button
                onClick={() => addDev(othersID)}
                className="follow-button"
              >
                Follow
              </button>
            ) : (
              <button
                onClick={() => removeDev(othersID)}
                className="unfollow-button"
              >
                Unfollow
              </button>
            )}
            <button onClick={messageRoom}>Message</button>
<<<<<<< HEAD
          </div>
          {/* SHOW THEIR POSTS */}
          {postsMapped.length ? (
            <div className="other-posts">{postsMapped}</div>
          ) : null}
          <div className="other-skills">{mappedSkills}</div>
=======
          </div>
          {/* SHOW THEIR POSTS */}
          {postsMapped.length ? (
            <div className="feed-container">{postsMapped}</div>
          ) : (
            <div className="feed-container uhoh">
              Uh-oh! This user does not have any current posts. Check back
              later.
            </div>
          )}
          <div className="skills-box">
            <h1>Skills</h1>
            <div className="skills">{mappedSkills}</div>
          </div>
>>>>>>> 375c9c72e9cfa50dab53aa6baca9e3847a781424
        </div>
      </div>
    );
  } else {
    return <LoadingAnimation />;
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setOtherPerson,
  setTheirSkills,
  setFollowing
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(OtherPerson);
