import React from "react";
import { connect } from "react-redux";
import { setUser } from "../../dux/reducers/userReducer";

function DevProfile(props) {
  console.log(props);
  return (
    <div>
      {encodeURIComponent(props.user.user.email) ===
      props.match.params.email ? (
        <button>Edit buttons</button>
      ) : (
        <button>Like</button>
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

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(DevProfile);
