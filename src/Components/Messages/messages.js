import React, { useState, useEffect } from "react";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setRooms } from "../../dux/reducers/roomReducer";
import AppHeader from "../AppHeader/AppHeader";
import { setUser } from "../../dux/reducers/userReducer";
import axios from "axios";
import { setMessages } from "../../dux/reducers/messageReducer";
import Convos from "./Convos";

function Messages(props) {
  useEffect(() => {
    if (!props.rooms.rooms.length) {
      axios.get("/api/rooms").then(res => {
        console.log(res.data);
        props.setRooms(res.data);
      });
    }

    // if (props.message.messages) {
    //   props.setMessages(null);
    // }
  }, [props.user.user]);

  if (!props.user.user) {
    return (
      <div>
        <AppHeader {...props} />
      </div>
    );
  }

  console.log(props);

  let mappedRooms = props.rooms.rooms.map(element => {
    return (
      <div key={element.id}>
        <Convos
          name={element.room_name}
          first_email={element.first_email}
          second_email={element.second_email}
        />
      </div>
    );
  });
  return (
    <div>
      <AppHeader {...props} />
      <ul>{mappedRooms}</ul>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setRooms,
  setMessages
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Messages);
