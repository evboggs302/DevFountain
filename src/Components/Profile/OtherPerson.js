import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import ViewSkills from "./ViewSkills";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setTheirSkills } from "../../dux/reducers/skillsReducer";
import { setUser, setOtherPerson } from "../../dux/reducers/userReducer";
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
            <div className="profile-pic"></div>
             {/* <img
            style={{ width: "100%", minWidth: "130px" }}
            src={profile_pic} 
             /> */}
          </div>
          <div>{`${first} ${last}`}</div>
          
        </div>
        <div>
          Contact Info
          <div>{title}</div>
          <div>
            <a href={portfolio} target="_blank">
              Portfolio
            </a>
          </div>
          <div>
            <a href={email} target="_blank">
              Email
            </a>
          </div>
          <div>
            <a href={linkedin} target="_blank">
              LinkedIn
            </a>
          </div>
          {/* {developer ? <ViewSkills {...props} /> : null} */}
          <button>Follow</button>
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
