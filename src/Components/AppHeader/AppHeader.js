import React, { useState, useEffect } from "react";
import { setUser, setFollowing } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import "./AppHeader.scss";
import axios from "axios";
import UseFetch from "../usefetch";
import { NavLink } from "react-router-dom";

function AppHeader(props) {
  const { data: user } = UseFetch("/api/user", true, null);
  useEffect(() => {
    if (user) {
      props.setUser(user);
    }
  }, [user]);

  // this Use Effect is to hit the whoIamFollowing endpoint and update the state(following) to have include the people who you are following
  const {data: following, fetchDataWithId: axioscall} = UseFetch('/api/following')
  useEffect(() => {
    console.log(props)
    if (props.user.user) {
      const {user_id} = props.user.user
      axioscall(user_id);
    }
  }, []);

  useEffect(() => {
    props.setFollowing(following);
  }, [following]);

  console.log(props);
  const logout = () => {
    axios.get("/api/logout").then(res => {
      console.log("user logged out");
      console.log("hit inside app header");

      props.setUser(null);
      props.history.push("/");
    });
  };

  return (
    <div className="app-header">
      <nav>
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
  setFollowing
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(AppHeader);
