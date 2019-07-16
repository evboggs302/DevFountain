import React, { useState, useEffect } from "react";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setPersonalSkills } from "../../dux/reducers/skillsReducer";
import { all } from "q";

function ViewSkills(props) {
  const { allSkills, mySkills } = props.skills;
  console.log(allSkills);
  console.log(mySkills);

  if (!props.user.user) {
    <div>
      <AppHeader />
    </div>;
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

  const { data: mySkillz, fetchDataWithId: getMySkills } = useFetch(
    `/api/skills/`,
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
  if (mySkillz) {
    for (let k = 0; k < allSkills.length; k++) {
      for (let i = 0; i < mySkillz.length; i++) {
        if (allSkills[k].skill_id === mySkillz[i]) {
          mySkillys.push(allSkills[k]);
        }
      }
    }
  }

  console.log("mySkillz: ", mySkillz);
  console.log("mySkillys: ", mySkillys);

  return <div />;
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
