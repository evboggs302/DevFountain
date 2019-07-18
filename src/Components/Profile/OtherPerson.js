import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setTheirSkills } from "../../dux/reducers/skillsReducer";
import { setUser, setOtherPerson } from "../../dux/reducers/userReducer";
import { FaLinkedin, FaEnvelope, FaFolderOpen } from "react-icons/fa";
import axios from "axios";
import LoadingAnimation from "../CoolAnimation/LoadingAnimation";

function OtherPerson(props) {
  const decoded = decodeURIComponent(props.match.params.email);

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
  useEffect(() => {
    axios.get(`/api/their_skills/${decoded}`).then(response => {
      console.log(response.data);
      let skillzExist = response.data.length;
      if (skillzExist) {
        props.setTheirSkills(response.data);
      }
    });
  }, []);

  const { allSkills, theirSkills } = props.user;
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
        <h5>{e.skill}</h5>
        <img src={e.icon} alt="skill icon" className="skill-icon" />
      </div>
    );
  });

  const { profilePosts } = props.posts;
  var postsMapped = [];
  if (profilePosts) {
    postsMapped = profilePosts.map((e, index) => {
      return (
        <div key={index}>
          <div>{e.content}</div>
          <div>{e.time_entered}</div>
        </div>
      );
    });
  }
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
              <button>Follow</button>
            </div>
          </div>
        </div>
        <div className="user-info">
          <h1>{title}</h1>
          <div>
            <a href={portfolio} target="_blank">
              <FaFolderOpen className="info-icon" />
              Portfolio
            </a>
          </div>
          <div>
            <div>
              <FaEnvelope className="info-icon" />
              {email}
            </div>
          </div>
          <div>
            <a href={linkedin} target="_blank">
              <FaLinkedin className="info-icon" />
              LinkedIn
            </a>
          </div>
          <button>Follow</button>
          <button>Message</button>
        </div>
        {/* SHOW THEIR POSTS */}
        {postsMapped.length ? <div>{postsMapped}</div> : null}
        <div>{mappedSkills}</div>
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
  setTheirSkills
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(OtherPerson);
