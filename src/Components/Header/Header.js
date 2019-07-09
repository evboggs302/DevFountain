import React, { Component } from "react";

class Header extends Component {
  render() {
    const { email, first, last } = this.props.user;
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

export default Header;
