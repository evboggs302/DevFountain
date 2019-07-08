import React from "react";
import { Switch, Route } from 'react-router-dom';
import "./reset.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/profile' component={ProfilePage}/>
        <Route path='/marketplace' component={MarketPlace}/>
      </Switch>

    </div>
  )

}

export default App;
