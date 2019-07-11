import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import MarketPlace from "./Components/MarketPlace/MarketPlace";
import Header from './Components/Header/Header'
import "./reset.css";
import "./App.scss";
import { connect } from "react-redux";
import { setSkills } from "./dux/reducers/skillsReducer";
import UseFetch from "./Components/usefetch";
import { ToastContainer } from "react-toastify";

function App(props) {
  const { data: skills } = UseFetch("/api/allskills", true, []);

  useEffect(() => {
    props.setSkills(skills)
  }, [skills])

  
  return (
    <div className="App">
      <Header/>
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/marketplace" component={MarketPlace} />
      </Switch>
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  setSkills
};

const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(App);
