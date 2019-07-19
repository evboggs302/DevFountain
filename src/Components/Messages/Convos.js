import React from "react";
import { setUser } from "../../dux/reducers/userReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router";

function Convos(props) {
  console.log(props);
  let propsArr = [props.first_email, props.second_email];
  let filtered = propsArr.filter(email => {
    return email !== props.user.user.email;
  });

  var encode = encodeURIComponent(filtered[0]);

  return (
    <li
      onClick={() => props.history.push(`/message/:${encode}`)}
      id={props.name}
    >
      {filtered[0]}
    </li>
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

export default withRouter(invokedConnect(Convos));
