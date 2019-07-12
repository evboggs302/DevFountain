import React, { Component } from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import './AppHeader.scss'
import Axios from "axios";



class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

logout = () => {
    Axios.get('/api/logout').then(res => {
    console.log('user logged out')
    this.props.setUser(null)
    this.setState({
        redirect: true
        })
    })
}

    render() {
        if(this.state.redirect) {
           return <Redirect to="/" />
        }
        return (
            <div className="app-header">
               <button onClick={() => this.logout()}>Logout</button>
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