import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import ViewSkills from "./ViewSkills";
import EditProfile from "./EditProfile";
import OtherPerson from "./OtherPerson";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setUser, setOtherPerson } from "../../dux/reducers/userReducer";
import axios from "axios";
import { FaLinkedin, FaEnvelope, FaFolderOpen } from "react-icons/fa";
import "./Profile.scss";

function Profile(props) {
  // console.log(props);

  let [className, setClassName] = useState("profile");

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
    title,
    user_id
  } = props.user.user;

  // if (!current) {
  //   axios.get(`/api/others/${decoded}`).then(response => {
  //     console.log(response.data);
  //     props.setOtherPerson(response.data);
  //     return;
  //   });
  // }

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
              <div>
                {current ? (
                  <button onClick={() => setClassName(className + " edit")}>
                    Edit Profile
                  </button>
                ) : (
                  <button>Follow</button>
                )}
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
          </div> 
          <div className="skills-box">
              {developer ? <ViewSkills {...props}/> : null}
          </div>
          <div className={className}>
            <EditProfile {...props} />
          </div>
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
