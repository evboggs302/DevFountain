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
  useEffect(() => {
    axios.get(`/api/their_skills/${decoded}`).then(response => {
      console.log(response.data);
      let skillzExist = response.data.length;
      if (skillzExist) {
        props.setTheirSkills(response.data);
      }
    });
  }, [props.user.otherPerson]);

  console.log(props);
  return (
    <div>
      <div>
        <div>
          <div>
            <img src={profile_pic} />
          </div>
          <div>{`${first} ${last}`}</div>
          <div>{title}</div>
        </div>
        <div>
          Contact Info
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
