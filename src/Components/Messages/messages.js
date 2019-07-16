import React, { useState, useEffect } from "react";
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setRooms } from "../../dux/reducers/roomReducer";
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

  if (!props.rooms.rooms) {
    axios.get("/api/rooms").then(res => {
      props.setRooms(res.data);
    });
    return <div />;
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
      <ul>{mappedRooms}</ul>
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setUser,
  setRooms
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(Messages);
