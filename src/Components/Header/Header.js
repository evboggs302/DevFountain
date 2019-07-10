import React, { Component, useState } from "react";
import useFetch from "../usefetch";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import axios from "axios";

class Header extends Component {
  componentDidMount() {
    axios.get("/api/user").then(res => {
      // console.log(res.data);
      this.props.setUser(res.data);
    });
  }

  login = (email, password) => {
    const { postData: sendLogin } = useFetch("/api/login");
    sendLogin({ email, password }).then(res => {
      this.props.setUser(res.data);
    });
  };

  render() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(this.props);
    const { first, last } = this.props.userReducer.user;
    return (
      <div>
        {!this.props.userReducer.user ? (
          <div>
            Email:
            <input onChange={e => setEmail(e.target.value)} />
            Password:
            <input onChange={e => setPassword(e.target.value)} />
            <button onClick={() => this.login(email, password)}>Login</button>
          </div>
        ) : (
          <div>{`Welcome, ${first} ${last}`}</div>
        )}
      </div>
    );
  }
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
