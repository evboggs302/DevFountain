import React, { useState, useEffect } from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { setMessages } from "../../dux/reducers/messageReducer";
import { connect } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import axios from "axios";
import MappedMessages from "./MappedMessages";
import { setRooms } from "../../dux/reducers/roomReducer";

function Message(props) {
  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }

  if (!props.message.messages) {
    console.log("zach");
    axios.get("/api/messages").then(res => {
      props.setMessages(res.data);
    });
    axios.get("/api/rooms").then(res => {
      props.setRooms(res.data);
    });
    return <div />;
  }

  let filteredMessages;
  if (props.message.messages.length) {
    filteredMessages = props.message.messages.filter(message => {
      return (
        message.email === props.rooms.rooms[0].first_email ||
        message.email === props.rooms.rooms[0].second_email
      );
    });
  }

  console.log(filteredMessages);

  let mappedMessages = filteredMessages.map((element, index) => {
    return (
      <div id={index}>
        <MappedMessages
          {...props}
          content={element.content}
          sender={element.email}
        />
      </div>
    );
  });

  console.log(props);
  return (
    <div>
      <AppHeader {...props} />
      <ul>{mappedMessages}</ul>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setMessages,
  setRooms
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Message);
