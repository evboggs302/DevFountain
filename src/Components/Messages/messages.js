import React, { useState, useEffect } from "react";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setMessages } from "../../dux/reducers/messageReducer";
import AppHeader from "../AppHeader/AppHeader";
import { setUser } from "../../dux/reducers/userReducer";
import axios from "axios";
import Convos from "./Convos";

function Messages(props) {
  if (!props.user.user) {
    return (
      <div>
        <AppHeader />
      </div>
    );
  }

  if (!props.message.messages) {
    axios.get("/api/messages").then(res => {
      props.setMessages(res.data);
    });
    return <div />;
  }

  console.log(props);

  let mappedMessages = props.message.messages.map((element, index) => {
    return (
      <div key={element.email}>
        <Convos email={element.email} />
      </div>
    );
  });
  return (
    <div>
      <ul>{mappedMessages}</ul>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setMessages
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Messages);
