import React from "react";
import { connect } from "react-redux";

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

const invokedConnect = connect(mapStateToProps);

export default invokedConnect(DevProfile);
