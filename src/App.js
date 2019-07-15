import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import MarketPlace from "./Components/MarketPlace/MarketPlace";
// import Header from "./Components/Header/Header";
import "./reset.css";
import "./App.scss";
import { connect } from "react-redux";
import { setSkills } from "./dux/reducers/skillsReducer";
import { setDevelopers } from "./dux/reducers/marketplaceReducer";
import UseFetch from "./Components/usefetch";
import { ToastContainer } from "react-toastify";

function App(props) {
  const { data: skills } = UseFetch("/api/allskills", true, []);

  //Getting all developers from marketplace endpoint
  const { data: devs } = UseFetch("/api/marketplace", true, []);

  

  console.log(devs);
  useEffect(() => {
    props.setSkills(skills);
  }, [skills]);

  useEffect(() => {
    props.setDevelopers(devs);
  }, [devs]);

  console.log(props);

  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile/:email" component={Profile} />
        <Route path="/marketplace" component={MarketPlace} />
      </Switch>
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  setSkills,
  setDevelopers
};

const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(App);
