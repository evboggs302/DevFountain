import React, {useState, useEffect } from "react";
import {Redirect} from 'react-router-dom'
import usefetch from "../usefetch";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";


function Header(props) {
  //calling usefetch and destructering "fetchdata" and "postdata" using aliases userData for fetchdata and login for postData.
    const {data: userData, postData: login }= usefetch('/api/user')

  //
    useEffect(() => {
    //
    props.setUser(userData)
    }, [userData])
  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    // console.log(this.props);
    const { first, last } = props.userReducer.user;
    if(redirect) {
      return <Redirect to='/profile'/>
    }
    return (
      <div>
        {!props.userReducer.user ? (
          <div>
            Email:
            <input onChange={e => setEmail(e.target.value)} />
            Password:
            <input onChange={e => setPassword(e.target.value)} />
            <button onClick={() => login(email, password).then(setRedirect(true))}>Login</button>
          </div>
        ) : (
          <div>{`Welcome, ${first} ${last}`}</div>
        )}
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
