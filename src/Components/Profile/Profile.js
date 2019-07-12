import React, {useEffect} from "react";
import RecProfile from "./RecProfile";
import DevProfile from "./DevProfile";
import Header from '../AppHeader/AppHeader';
import usefetch from "../usefetch";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";

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

const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(mapStateToProps, mapDispatchToProps);

export default invokedConnect(Profile);
