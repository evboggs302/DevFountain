import React from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";

function Convos(props) {
  console.log(props);
  let propsArr = [props.first_email, props.second_email];
  let filtered = propsArr.filter(email => {
    return email != props.user.user.email;
  });

  return <li id={props.name}>{filtered[0]}</li>;
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

export default invokedConnect(Convos);
