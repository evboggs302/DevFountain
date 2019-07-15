import React, { useState, useEffect } from "react";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setPersonalSkills } from "../../dux/reducers/skillsdux/skillsReducer";

function ViewSkills(props) {
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
    setPersonalSkills(mySkillz);
  }, [mySkillz]);

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
