import React, { useEffect } from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import usefetch from "../usefetch";
import './AppHeader.scss'



function AppHeader(props) {
    const { data: user, fetchData: logoutUser } = usefetch("/api/logout");

    useEffect(() => {
      props.setUser(user);
    }, [user]);

    return (
        <div className="app-header">
            <NavLink to="/">
           <button onClick={() => logoutUser()}>Logout</button>
            </NavLink>
          
        </div>
    )
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
  
  export default invokedConnect(AppHeader)