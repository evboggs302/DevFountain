import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import MarketPlace from "./Components/MarketPlace/MarketPlace";
import "./reset.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
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

export default App;
