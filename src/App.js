import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import MarketPlace from './Components/MarketPlace/MarketPlace';
import "./reset.css";
import "./App.scss";
import {connect} from 'react-redux'
import {setSkills} from './dux/reducers/skillsReducer'
import UseFetch from './Components/usefetch'

function App() {
  const {data: skills, fetchData: getSkills} = UseFetch('/api/allskills')
  console.log(skills, getSkills)
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/marketplace' component={MarketPlace}/>
      </Switch>

    </div>
  )
}

const mapPropsToState = (reduxState) => {
  return reduxState
}

const mappedDispatchToProps = {
  setSkills
}

const myConnect = connect(mapPropsToState, mappedDispatchToProps)

export default myConnect(App);
