import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";


function RecProfile(props) {
  console.log(props);
  const decoded = decodeURIComponent(props.match.params.email);
  return (
    <div>
      {props.user.user.email === decoded ? (
        <button>Edit buttons</button>
      ) : (
        <button>Like</button>
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

export default invokedConnect(RecProfile);
