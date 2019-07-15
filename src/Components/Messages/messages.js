import React, { useState, useEffect } from "react";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setMessages } from "../../dux/reducers/messageReducer";

function Messages(props) {
  console.log(props);
  const { data: messages } = usefetch("/api/messages", true, []);
  props.setMessages(messages);
  return <div />;
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setMessages
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Messages);
