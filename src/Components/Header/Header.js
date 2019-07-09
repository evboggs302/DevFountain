import React, { Component } from "react";
import { setUser } from '../../dux/reducers/userReducer';
import { connect } from 'react-redux'
import axios from 'axios'

class Header extends Component {

componentDidMount() {
    axios.get('/api/user').then(res => {
        // console.log(res.data);
        this.props.setUser(res.data)
    })
}

login = () => {
  const {email, password} = this.props.userReducer.user
  axios.post('/api/login', {email, password}).then(res => {
    this.props.setUser(res.data);
  })
}


  render() {
    console.log(this.props)
    const { email, first, last } = this.props.userReducer.user;
    return (
      <div>
        {!this.props.user ? (
          <div>
            Email:
            <input />
            Password:
            <input />
            <button>Login</button>
          </div>
        ) : (
          <div>{`Welcome, ${first} ${last}`}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchToProps = {
  setUser
}

const invokedConnect = connect (
  mapStateToProps,
  mapDispatchToProps
)



export default invokedConnect(Header);
