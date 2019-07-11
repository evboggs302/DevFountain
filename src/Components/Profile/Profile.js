import React from "react";
import RecProfile from "./RecProfile";
import DevProfile from "./DevProfile";
import Header from '../Header/Header';
import { connect } from "react-redux";

function Profile(props) {
  console.log(props);
  return (
    <div>
      <div>
        <Header/>
      </div>
      {/* conditionally rending whether the user is a developer. If the user is not a developer, profile will render the
        recruiter profile */}
      {props.user.user.developer ? (
        <DevProfile match={props.match} />
      ) : (
        <RecProfile />
      )}
    </div>
  );
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const invokedConnect = connect(mapStateToProps);

export default invokedConnect(Profile);
