import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import ViewSkills from "./ViewSkills";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setTheirSkills } from "../../dux/reducers/skillsReducer";
import { setUser, setOtherPerson } from "../../dux/reducers/userReducer";
import { FaLinkedin, FaEnvelope, FaFolderOpen } from "react-icons/fa";
import axios from "axios";

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
  useEffect(
    () => {
      axios.get(`/api/their_skills/${decoded}`).then(response => {
        console.log(response.data);
        let skillzExist = response.data.length;
        if (skillzExist) {
          props.setTheirSkills(response.data);
        }
      });
    },
    []
    //  [props.user.otherPerson]
  );

  console.log(props);
  return (
    <div>
        <div className="user-container">
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
          {/* {developer ? <ViewSkills {...props} /> : null} */}
          
      </div>
      {/* {myPostsMapped.length ? <div>{myPostsMapped}</div> : null} */}
    </div>
  );
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
