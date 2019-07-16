import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import { Link, NavLink } from "react-router-dom";
import EditProfile from "./EditProfile";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setMySkills } from "../../dux/reducers/skillsReducer";
import { setUser } from "../../dux/reducers/userReducer";

function Profile(props) {
  console.log(props);

  // const { data: mySkillz, fetchDataWithId: getMySkills } = useFetch(
  //   `/api/skills/${user_id}`,
  //   false
  // );

  // useEffect(() => {
  //   getMySkills();
  //   setMySkills(mySkillz);
  // }, [mySkillz]);

  let [className, setClassName] = useState("profile");

  if (!props.user.user) {
    return <div />;
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

  // var mySkillsMapped;
  // if (developer) {
  //   mySkillsMapped = mySkills.map((e, index) => {
  //     console.log(e);
  //     return (
  //       <div key={index}>
  //         <h3>{`${e.skill} ${e.icon}`}</h3>
  //       </div>
  //     );
  //   });
  // }

  // console.log(mySkillz);

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
            {/* {mySkillsMapped.length ? <div>{mySkillsMapped}</div> : null} */}
            {current ? (
              <button onClick={() => setClassName(className + " edit")}>
                Edit Profile
              </button>
            ) : (
              <button>Follow</button>
            )}
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
  setMySkills,
  setUser
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Profile);
