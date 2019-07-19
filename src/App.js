import React, { useEffect } from "react";
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
import NewsFeed from "./Components/NewsFeed/NewsFeed";
import Messages from "./Components/Messages/messages";
import Message from "./Components/Messages/message";

function App(props) {
  const { data: skills } = UseFetch("/api/allskills", true, []);

  useEffect(() => {
    props.setSkills(skills);
  }, [skills]);

  //Getting all developers from marketplace endpoint
  const { data: devs } = UseFetch("/api/marketplace", true, []);
  useEffect(() => {
    props.setDevelopers(devs);
  }, [devs]);

  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/profile/:email" component={Profile} /> */}
        <Route
          path="/profile/:email"
          render={props => <Profile {...props} />}
        />
        <Route path="/marketplace" component={MarketPlace} />
        <Route path="/newsfeed" component={NewsFeed} />
        <Route path="/messages" component={Messages} />
        <Route path="/message/:email" component={Message} />
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
