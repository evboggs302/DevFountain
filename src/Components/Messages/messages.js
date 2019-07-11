import React from "react";
import UseFetch from "../usefetch";
import {
  setFromUser,
  setMessage,
  setTimeSent
} from "../../dux/reducers/messageReducer";

function Messages(props) {
  return <div />;
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setFromUser,
  setMessage,
  setTimeSent
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Messages);
