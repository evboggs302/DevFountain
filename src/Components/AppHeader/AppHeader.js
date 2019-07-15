import React, { Component, useEffect } from "react";
import { setUser, setFollowing } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import "./AppHeader.scss";
import axios from "axios";
import UseFetch from '../usefetch'
import {NavLink} from 'react-router-dom';

function AppHeader(props) {
  
  const {data: following, fetchDataWithId: whoIamFollowing} = UseFetch('/api/following', true, [])
  const {user_id} = props.user.user
  

  // this Use Effect is to hit the whoIamFollowing endpoint and update the state(following) to have include the people who you are following
  useEffect(() => {
    whoIamFollowing(user_id);
  }, []);

  useEffect(() => {
    props.setFollowing(following);
    return () => props.setFollowing(following);
  }, [following]);

  console.log(props);
  const logout = () => {
    axios.get("/api/logout").then(res => {
      console.log("user logged out");
      console.log("hit inside app header");

      props.setUser(null);
    });
  };

  

  if (!props.user.user) {
    window.location.pathname = "/";
  }

  return (
    <div className="app-header">
      <nav>
        <NavLink to='/marketplace'>MarketPlace</NavLink>
        <NavLink to='/newsfeed'>NewsFeed</NavLink>
      </nav>
      <button className="logout-btn" onClick={() => logout()}>Logout</button>
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
