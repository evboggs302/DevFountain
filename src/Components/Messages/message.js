import React, { useState, useEffect } from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { setMessages } from "../../dux/reducers/messageReducer";
import { connect } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import axios from "axios";
import MappedMessages from "./MappedMessages";
import { setRooms } from "../../dux/reducers/roomReducer";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:4000");

function Message(props) {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [returnedMessages, setReturn] = useState([]);

  useEffect(() => {
    if (!props.user.user) {
      socket.on("connect", function() {
        socket.emit("join room", roomName);
      });
    }
  }, []);

  // socket.on("message", function() {
  //   socket.emit("message", userMessage);
  // });

  socket.on("message", returnedMessage => {
    console.log("I recieved this:", returnedMessage);
    setReturn([...returnedMessages, returnedMessage]);
  });

  let email = props.history.location.pathname;

  var re = new RegExp("/message/:");

  var x = email.replace(re, "");

  var decode = decodeURIComponent(x);

  if (!props.user.user) {
    return (
      <div>
        <AppHeader />
      </div>
    );
  }

  var send_email = props.user.user.email;
  var rec_email = decode;
  var user_id = props.user.user.user_id;
  var userMessage = { send_email, rec_email, message, user_id };

  if (!props.message.messages) {
    console.log("zach");
    axios.get(`/api/messages/${decode}`).then(res => {
      props.setMessages(res.data);
    });
    axios.get("/api/rooms").then(res => {
      props.setRooms(res.data);
      let filterRooms = props.rooms.rooms.filter(room => {
        return room.first_email === decode || room.second_email === decode;
      });
      setRoomName(filterRooms[0].roomName);
    });
    return <div />;
  }

  let mappedMessages = props.message.messages.map((element, index) => {
    return (
      <div id={index}>
        <MappedMessages content={element.content} sender={element.email} />
      </div>
    );
  });

  console.log(props);
  return (
    <div>
      <AppHeader />
      <ul>{mappedMessages}</ul>
      <div>
        {returnedMessages.map(message => {
          return <div className="message">{message}</div>;
        })}
      </div>
      <input
        autoFocus={true}
        id="message"
        type="text"
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={e => {
          socket.emit("message", userMessage);
          console.log("I sent this:", userMessage);
          setMessage("");
        }}
      >
        Submit
      </button>
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
