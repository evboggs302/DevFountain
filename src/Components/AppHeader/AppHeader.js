import React, { useState, useEffect } from "react";
import {
  setUser,
  setFollowing,
  setOtherPerson
} from "../../dux/reducers/userReducer";
import { setTheirSkills } from "../../dux/reducers/skillsReducer";
import { connect } from "react-redux";
import "./AppHeader.scss";
import axios from "axios";
import UseFetch from "../usefetch";
import { NavLink } from "react-router-dom";

function AppHeader(props) {
  const { data: user } = UseFetch("/api/user", true, null);
  useEffect(() => {
    console.log(props);
    if (user) {
      props.setUser(user);
    }
  }, [user]);

  // this Use Effect is to hit the whoIamFollowing endpoint and update the state(following) to have include the people who you are following
  const { data: following, fetchDataWithId: axioscall } = UseFetch(
    "/api/following"
  );
  useEffect(() => {
    console.log(props);
    if (props.user.user) {
      const { user_id } = props.user.user;
      axioscall(user_id);
    }
  }, []);

  useEffect(() => {
    const decoded = decodeURIComponent(props.match.params.email);
    axios.get(`/api/others/${decoded}`).then(response => {
      console.log(response.data);
      props.setOtherPerson(response.data);
      return;
    });
  }, [props.match.params.email]);

  useEffect(() => {
    const decoded = decodeURIComponent(props.match.params.email);
    axios.get(`/api/their_skills/${decoded}`).then(response => {
      console.log(response.data);
      let skillzExist = response.data.length;
      if (skillzExist) {
        props.setTheirSkills(response.data);
      }
    });
  }, [props.user.otherPerson]);

  useEffect(() => {
    props.setFollowing(following);
  }, [following]);

  if (!props.user.user) {
    return <div />;
  }

  // const {data: following} = useFetch("", true, []);

  // useEffect(() => {
  //   if (props.user.user) {
  //     axioscall(id).then()
  // }, []);

  // this Use Effect is to hit the whoIamFollowing endpoint and update the state(following) to have include the people who you are following

  console.log(props);
  const logout = () => {
    axios.get("/api/logout").then(res => {
      console.log("user logged out");
      console.log("hit inside app header");

      props.setUser(null);
      props.history.push("/");
    });
  };

  let encode;
  if (props.user && props.user.user && props.user.user.first) {
    console.log(props)
    const { email } = props.user.user;
    encode = encodeURIComponent(email);
  }


  return (
    <div className="app-header">
      <nav>
        <NavLink to={`/profile/${encode}`}>Profile</NavLink>
        <NavLink to="/marketplace">MarketPlace</NavLink>
        <NavLink to="/newsfeed">NewsFeed</NavLink>
      </nav>
      <NavLink to="/messages">Messages</NavLink>
      <button className="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setFollowing,
  setOtherPerson,
  setTheirSkills
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(AppHeader);
