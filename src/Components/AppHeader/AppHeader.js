import React, { useState, useEffect } from "react";
import {
  setUser,
  setFollowing,
  setOtherPerson
} from "../../dux/reducers/userReducer";
import { setProfilePosts } from "../../dux/reducers/postsReducer";
import { setTheirSkills } from "../../dux/reducers/skillsReducer";
import { connect } from "react-redux";
import "./AppHeader.scss";
import axios from "axios";
import UseFetch from "../usefetch";
import { NavLink } from "react-router-dom";
import DevLogo from "../../media/DF-long_white.png";

function AppHeader(props) {
  const { data: user } = UseFetch("/api/user", true, null);
  useEffect(() => {
    console.log(props);
    if (user) {
      props.setUser(user);
    }
  }, [user]);

  // this Use Effect is to hit the whoIamFollowing endpoint and update the state(following) to have include the people who you are following
  const { data: following, fetchDataWithId: setWhoImFollowing } = UseFetch(
    "/api/following",
    false,
    []
  );
  useEffect(() => {
    if (props.user.user) {
      const { user_id } = props.user.user;
      setWhoImFollowing(user_id);
    }
  }, [props.user.user]);

  useEffect(() => {
    props.setFollowing(following);
  }, [following]);

  useEffect(() => {
    if (props.match.params.email) {
      const decoded = decodeURIComponent(props.match.params.email);
      axios.get(`/api/others/${decoded}`).then(response => {
        props.setOtherPerson(response.data);
      });
      axios.get(`/api/post/${decoded}`).then(response => {
        props.setProfilePosts(response.data);
      });
      axios.get(`/api/their_skills/${decoded}`).then(response => {
        props.setTheirSkills(response.data);
      });
    }
  }, [props.match.params.email]);

  // useEffect(() => {
  //   // if (props.user.otherPerson) {
  //   const decoded = decodeURIComponent(props.match.params.email);

  //   // }
  // }, [props.user.otherPerson.email]);

  if (!props.user.user) {
    return <div />;
  }

  const logout = () => {
    axios.get("/api/logout").then(res => {
      console.log("user logged out");
      props.setUser(null);
      props.history.push("/");
    });
  };

  let encode;
  if (props.user && props.user.user && props.user.user.first) {
    console.log(props);
    const { email } = props.user.user;
    encode = encodeURIComponent(email);
  }

  return (
    <div className="app-header">
      <img src={DevLogo} alt="dev fountain logo" className="app-header-logo" />
      <nav>
        <NavLink to={`/profile/${encode}`}>Profile</NavLink>
        <NavLink to="/marketplace">MarketPlace</NavLink>
        <NavLink to="/newsfeed">NewsFeed</NavLink>
        <NavLink to="/messages">Messages</NavLink>
      </nav>
      <button className="signout-btn" onClick={() => logout()}>
        Sign out
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
  setTheirSkills,
  setProfilePosts
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(AppHeader);
