import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import MarketPlace from "./Components/MarketPlace/MarketPlace";
import "./reset.css";
import "./App.scss";
import { connect } from "react-redux";
import { setSkills } from "./dux/reducers/skillsReducer";
import UseFetch from "./Components/usefetch";
<<<<<<< HEAD
import {ToastContainer} from 'react-toastify'
import Axios from "axios";
=======
import { ToastContainer } from "react-toastify";
>>>>>>> b95af202ef96d527ed9d3ce85a4aebc14634a927

function App(props) {
  const { data: skills } = UseFetch("/api/allskills");

  useEffect(() => {
    props.setSkills(skills)
  }, [skills])

   console.log(props)
  
  return (
    <div className="App">
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
