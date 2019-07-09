import React from "react";
import RecProfile from "./RecProfile";
import DevProfile from "./DevProfile";

function Profile(props) {
  return (
    <div>
      {/* conditionally rending whether the user is a developer. If the user is not a developer, profile will render the
        recruiter profile */}
      {props.user.user.developer ? <DevProfile /> : <RecProfile />}
    </div>
  );
}

export default Profile;
