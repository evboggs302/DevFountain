import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import { Link, NavLink } from "react-router-dom";
import EditProfile from "./EditProfile";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";

function Profile(props) {
  console.log(props);
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
  let decoded = decodeURIComponent(props.match.params.email);
  let current = props.user.user.email === decoded;
  const { data: mySkills, fetchDataWithId: getMySkills } = useFetch(
    `/api/skills/${user_id}`,
    false
  );

  useEffect(() => {
    getMySkills();
  }, [mySkills]);

  let [className, setClassName] = useState("profile");

  

  var mySkillsMapped;
  if (developer) {
    mySkillsMapped = mySkills.map((e, index) => {
      console.log(e);
      return (
        <div key={index}>
          <h3>{`${e.skill} ${e.icon}`}</h3>
        </div>
      );
    });
  }

  return (
    <div>
      <AppHeader {...props} />
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
            {developer ? <div>display users skills here</div> : null}
            {current ? (
              <button onClick={() => setClassName(className + " edit")}>
                Edit Profile
              </button>
            ) : (
              <button>Follow</button>
            )}
          </div>
        </div>
        {mySkillsMapped.length ? <div>{mySkillsMapped}</div> : null}
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
