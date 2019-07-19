import React, { useState, useEffect } from "react";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setPersonalSkills } from "../../dux/reducers/skillsReducer";
import AppHeader from "../AppHeader/AppHeader";
import "./ViewSkills.scss";

function ViewSkills(props) {
  const { allSkills, mySkills } = props.skills;
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

  const { data: mySkillz, fetchDataWithId: getMySkills } = useFetch(
    `/api/skills`,
    false,
    []
  );

  useEffect(() => {
    getMySkills(email);
  }, []);

  useEffect(() => {
    props.setPersonalSkills(mySkillz);
  }, [mySkillz]);

  var mySkillys = [];
  if (mySkills) {
    for (let k = 0; k < allSkills.length; k++) {
      for (let i = 0; i < mySkills.length; i++) {
        if (allSkills[k].skill_id === mySkills[i]) {
          mySkillys.push(allSkills[k]);
        }
      }
    }
  }

  const mappedSkills = mySkillys.map(e => {
    return (
      <div key={e.skill_id}>
        <h2 className="skill-name">{e.skill}</h2>
        <img src={e.icon} alt="skill icon" className="skill-icon" />
      </div>
    );
  });

  if (!props.user.user) {
    return (
      <div>
        <AppHeader />
      </div>
    );
  }
  console.log(props);
  return <div  className="skills-box">
            <h1>Skills</h1>
            <div className="skills">
              {mappedSkills}
            </div>
        </div>;
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setPersonalSkills
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ViewSkills);
