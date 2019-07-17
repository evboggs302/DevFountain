import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import usefetch from "../usefetch";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import DevLogo from '../../media/DF-long_white.png'
import "./Header.scss";
import {toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Header(props) {
  //calling usefetch and destructering "fetchdata" and "postdata" using aliases userData for fetchdata and login for postData.
  let { data: userData, postData: login } = usefetch("/api/login", false);

  useEffect(() => {
    console.log("Setting user", userData);
    props.setUser(userData);
  }, [userData]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toLogin(email, password){
    login({ email, password })
  }
  console.log(props)
  console.log(userData)
  
  //Check to see if login is incorrect
  if(userData == 'Incorrect username/password'){
    console.log(userData)
    toast('Incorrect Username/Password' , {type: 'error'})
  }

  if (props.user && props.user.user && props.user.user.first) {
    const { email } = props.user.user;
    var encode = encodeURIComponent(email);
    return <Redirect to={`/profile/${encode}`} />;
    // return <Redirect to={'/marketplace'} />
  }

  return (
  
    <div className="header-container">
      <img src={DevLogo} alt="dev fountain logo"/>
      <form>
      <input
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
      />
      <input
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="input"
      />
      <input type='reset' value='Login' onClick={() => toLogin(email, password)} className="login-btn" />
      </form>
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

export default invokedConnect(Header);
