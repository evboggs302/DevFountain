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
  const [roomName, setRoomName] = useState();
  const [message, setMessage] = useState("");
  // const [returnedMessages, setReturn] = useState([]);
  let email = props.history.location.pathname;

  var re = new RegExp("/message/:");

  var x = email.replace(re, "");

  var decode = decodeURIComponent(x);
  var send_email = props.user.user.email;
  var rec_email = decode;
  var user_id = props.user.user.user_id;
  var userMessage = { send_email, rec_email, message, user_id, roomName };

  useEffect(() => {
    axios.get("/api/rooms").then(res => {
      setRooms(res.data);
      let filterRooms = props.rooms.rooms.filter(room => {
        return room.first_email === decode || room.second_email === decode;
      });

      setRoomName(filterRooms[0].room_name);
      socket.on("message", returnedMessage => {
        console.log("I recieved this:", [
          ...props.message.messages,
          returnedMessage
        ]);

        const {
          send_email,
          rec_email,
          message,
          user_id,
          roomName
        } = userMessage;
        props.setMessages([
          ...props.message.messages,
          { email: send_email, content: returnedMessage, time_sent: new Date() }
        ]);
      });
      console.log(filterRooms[0].room_name);
      socket.emit("room", filterRooms[0].room_name);
    });
  }, [props.message.messages, props.rooms.rooms]);

  // socket.on("message", function() {
  //   socket.emit("message", userMessage);
  // });

  // socket.on("message", returnedMessage => {
  //   console.log("I recieved this:", returnedMessage);
  //   setReturn([...returnedMessages, returnedMessage]);
  // });

  if (!props.user.user || !props.rooms.rooms) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }

  if (!props.message.messages.length) {
    console.log("zach");
    axios.get(`/api/messages/${decode}`).then(res => {
      console.log("resfrin setting messages", res.data);
      props.setMessages(res.data);
    });
  }

  if (!props.rooms.rooms.length) {
    axios.get("/api/rooms").then(res => {
      props.setRooms(res.data);
      let filterRooms = props.rooms.rooms.filter(room => {
        return room.first_email === decode || room.second_email === decode;
      });
      setRoomName(filterRooms[0].room_name);
      socket.on("connect", function() {
        console.log("userEffect", roomName);
        socket.emit("room", roomName);
        console.log("room connected", roomName);
      });
    });
  }

  let mappedMessages = props.message.messages.map((element, index) => {
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

  console.log("----------------->", props.message.messages);
  return (
    <div>
      <AppHeader {...props} />
      <ul>{mappedMessages}</ul>
      <div>
        {props.message.messages.map((message, index) => {
          // console.log(message);
          return (
            <div key={index} className="message">
              <ul>
                <li>{message.email}</li>
                <li>{message.content}</li>
              </ul>
            </div>
          );
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
