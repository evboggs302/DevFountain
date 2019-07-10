<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import MarketPlace from './Components/MarketPlace/MarketPlace';
import "./reset.css";
import "./App.scss";
import {connect} from 'react-redux'
import {setSkills} from './dux/reducers/skillsReducer'
import UseFetch from './Components/usefetch'
import Axios from "axios";
=======
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import MarketPlace from "./Components/MarketPlace/MarketPlace";
import "./reset.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
>>>>>>> 45d393da3e13b25de4735385045b9604bbec2048

function App(props) {
  const {data: skillsData, fetchData: setSkills}= UseFetch('/api/allskills')
  let skills = skillsData

  useEffect(() => {
    props.setSkills(skills)
  }, [skills])
  
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/marketplace" component={MarketPlace} />
      </Switch>
    </div>
<<<<<<< HEAD
  )
}

const mapPropsToState = (reduxState) => {
  return reduxState
=======
  );
>>>>>>> 45d393da3e13b25de4735385045b9604bbec2048
}

const mappedDispatchToProps = {
  setSkills
}

const myConnect = connect(mapPropsToState, mappedDispatchToProps)

export default myConnect(App);
