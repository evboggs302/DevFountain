import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import ViewSkills from "./ViewSkills";
import EditProfile from "./EditProfile";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";
import {FaLinkedin, FaEnvelope, FaFolderOpen} from 'react-icons/fa'
import './Profile.scss';

function Profile(props) {
  // console.log(props);

  let [className, setClassName] = useState("profile");

  if (!props.user.user) {
    return (
      <div>
        <AppHeader />
      </div>
    );
  }

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

  const decoded = decodeURIComponent(props.match.params.email);
  const current = props.user.user.email === decoded;

  return (
    <div>
      <AppHeader {...props} />
      <div>
        <div className="user-container">
            <div className="photo-div">
              <div>
                <div className="profile-pic">
                  <img style={{width: '100%', minWidth: '130px'}} src={profile_pic}/>
                </div>
                <h1 className="user-name">{`${first} ${last}`}</h1>
              </div>
              <div>
                {developer ? <ViewSkills {...props} /> : null}
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
                <FaFolderOpen className="info-icon"/>
                Portfolio
              </a>
            </div>
            <div>
              <a href={email} target="_blank">
                <FaEnvelope className="info-icon"/>
                Email
              </a>
            </div>
            <div>
              <a href={linkedin} target="_blank">
                <FaLinkedin className="info-icon"/>
                LinkedIn
              </a>
            </div>
        </div>
        {/* {myPostsMapped.length ? <div>{myPostsMapped}</div> : null} */}
      </div>
      <div className={className}>
        <EditProfile {...props} />
      </div>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
