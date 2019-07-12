import React, { Component } from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import "./AppHeader.scss";
import axios from "axios";

function AppHeader(props) {
  const logout = () => {
    axios.get("/api/logout").then(res => {
      console.log("user logged out");
      console.log("hit inside app header");

      props.setUser(null);
    });
  };

  console.log(props);

  if (!props.user.user) {
    window.location.pathname = "/";
  }

  return (
    <div className="app-header">
      <button onClick={() => logout()}>Logout</button>
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

export default invokedConnect(AppHeader);
