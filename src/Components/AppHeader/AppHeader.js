import React, { Component } from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import './AppHeader.scss'
import Axios from "axios";



class AppHeader extends Component {
    constructor(props) {
        super(props)
    }

logout = () => {
    Axios.get('/api/logout').then(res => {
    console.log('user logged out')
    this.props.setUser(null)
    })
}

    render() {
        return (
            <div className="app-header">
                <NavLink exact to="/">
               <button onClick={() => this.logout()}>Logout</button>
                </NavLink>
            </div>
        )
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
  
  export default invokedConnect(AppHeader)