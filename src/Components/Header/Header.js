import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import usefetch from "../usefetch";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import "./Header.scss";

function Header(props) {
  //calling usefetch and destructering "fetchdata" and "postdata" using aliases userData for fetchdata and login for postData.
  const { data: userData, postData: login } = usefetch("/api/login", false);

  useEffect(() => {
    console.log("Setting user", userData);
    props.setUser(userData);
  }, [userData]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (props.user && props.user.user && props.user.user.first) {
    const { email } = props.user.user;
    var encode = encodeURIComponent(email);
    return <Redirect to={`/profile/${encode}`} />;
    // return <Redirect to='/marketplace' />
  }

  return (
    <div className="login-container">
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
      <button onClick={() => login({ email, password })}>Login</button>
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
